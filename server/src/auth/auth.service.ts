import { Injectable } from '@nestjs/common';
import { SignInReqDto, SignInResDto } from './dto/signin-auth.dto';
import Axios, { AxiosRequestConfig } from 'axios';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Username, UsernameDocument } from './schemas/username.schema';
import { User, UserDocument } from './schemas/user.schema';
import { newWallet } from 'lib/mnemonic';
import { UserInfoDto } from './dto/userInfo.dto';
import { LikedEvent } from 'src/event/schemas/likedEvent.schema';
import { Event } from 'src/event/schemas/event.schema';
import { Cron } from '@nestjs/schedule';
import { HoldingType } from 'src/token/schemas/holding.schema';
import { Participant, ParticipantDocument } from 'src/token/schemas/participant.schema';

@Injectable()
export class AuthService {
  userModel: Model<UserDocument>;
  usernameModel: Model<UsernameDocument>;
  EventModel: Model<Event>;
  LikedEventModel: Model<LikedEvent>;
  HoldingModel: Model<HoldingType>;
  ParticipantModel: Model<ParticipantDocument>;
  constructor(
    private jwtService: JwtService,
    // @InjectConnection(User.name) private userModel: Model<User>,
    // @InjectConnection(Username.name) private usernameModel: Model<Username>,
    @InjectConnection() private readonly mongooseConnection: Connection,
  ) {
    this.userModel = mongooseConnection.model(User.name);
    this.usernameModel = mongooseConnection.model(Username.name);
    this.EventModel = mongooseConnection.model('Event');
    this.LikedEventModel = mongooseConnection.model('LikedEvent');
    this.HoldingModel = mongooseConnection.model('Holding');
    this.ParticipantModel = mongooseConnection.model(Participant.name);
  }

  async signIn(signInReqDto: SignInReqDto): Promise<SignInResDto> {
    const signInResDto: SignInResDto = new SignInResDto();

    // Request Klip Result
    const axiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: 'https://a2a-api.klipwallet.com/v2/a2a/result',
      params: {
        request_key: signInReqDto.request_key,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // Request Klip Result
      const resultData = await (await Axios(axiosConfig)).data;
      console.log(resultData);
      // request_key가 유효기간이 다했을 경우
      if (Date.now() > resultData.expiration_time * 1000) throw new Error('시간 초과');
      signInResDto.setStatus(resultData.status);
      if (resultData.status === 'completed') {
        const userInfo = await this.userModel
          .findOne({ address: resultData.result.klaytn_address })
          .exec();

        // 유저 생성
        if (!userInfo) {
          const newUser = new User();
          const userId = await this.userModel.count().exec();

          const usernameData = await this.usernameModel.findOne({ id: userId }).exec();
          newUser._id = userId;
          newUser.address = resultData.result.klaytn_address;
          newUser.username = usernameData.get('username');

          const testWallet = await newWallet(newUser.address);
          newUser.test_address = testWallet.address.toLowerCase();
          newUser.test_private_key = testWallet.privateKey;

          await this.userModel.create(newUser);
        }

        signInResDto.setUsername(userInfo.get('username'));
        signInResDto.setAddress(userInfo.get('address'));
        signInResDto.setTestAddress(userInfo.get('test_address'));
        signInResDto.setMessage('로그인에 성공했습니다.');
      } else if (resultData.status === 'prepared') {
        signInResDto.setMessage('로그인을 진행 중입니다.');
      } else throw new Error();
    } catch (err) {
      console.error(err);
      signInResDto.setMessage('로그인에 실패했습니다.');
      signInResDto.setStatus('failure');
    }
    return signInResDto;
  }

  signInJWT(signInResDto: SignInResDto) {
    const payload = {
      address: signInResDto.test_address,
      username: signInResDto.username,
    };
    return this.jwtService.sign(payload);
  }

  verifyJWT(jwt: string) {
    const accessToken = this.jwtService.verify(jwt);
    console.log(accessToken);
    return { message: 'good' };
  }

  async userInfo(address: string): Promise<UserInfoDto | { message: string }> {
    const userInfoDto: UserInfoDto = new UserInfoDto();

    try {
      const userData = await this.userModel.findOne({ test_address: address }).exec();
      if (userData === null) throw new Error();
      userInfoDto.username = userData.get('username');
      userInfoDto.profile_url = `#${address.slice(2, 8)}`;
      userInfoDto.history.created = await this.EventModel.count({ address: address }).exec();
      userInfoDto.history.entry = await this.ParticipantModel.count({ address: address }).exec();
      const holdings = await this.HoldingModel.find({ address: address });
      userInfoDto.history.sale = 0;
      for (let i = 0; i < holdings.length; i++) {
        const eventId = holdings[i].get('event_id');
        const event = await this.EventModel.findOne({ type: 'sale', event_id: eventId }).exec();
        if (!!event) userInfoDto.history.sale += 1;
      }
      // const likedList = await this.LikedEventModel.find({ address: address });
      // const likedId = likedList.map((ele) => ele.event_id);
      // userInfoDto.history.sale = await this.EventModel.count({ event_id: likedId });
      userInfoDto.tokens = [];
      // console.log(address);
      const tokens = await this.HoldingModel.find({ address: address }).exec();
      // console.log(tokens);
      if (tokens.length > 0) {
        for (let i = 0; i < tokens.length; i++) {
          const event = await this.EventModel.findOne({
            event_id: tokens[i].event_id,
          }).exec();
          userInfoDto.tokens.push({
            token_id: tokens[i].token_id,
            token_image_url: event.token_image_url,
          });
        }
      }
      console.log(userInfoDto);
      return userInfoDto;
    } catch (err) {
      console.error(err);
      return {
        message: '일치하는 사용자가 없습니다.',
      };
    }
  }

  // Test
  // @Cron('*/5 * * * * *')
  // async getEventList(): Promise<void> {
  //   const index = await this.userModel.count().exec();
  //   const usernameData = await this.usernameModel.find({ index }).exec();
  //   const userData = await this.userModel.find({ username: usernameData[0].username }).exec();
  //   console.log(usernameData, userData);
  // }
}
