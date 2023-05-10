import { css } from '@emotion/react';
import axios, { AxiosRequestConfig } from 'axios';
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { klipActions } from '../../store/klipSlice';
import KlipAddress from './address';

const KlipLogin: FunctionComponent = () => {
  const [clicked, setClicked] = React.useState(false);
  const klipState = useSelector((state: RootState) => state.klip);
  const dispatch = useDispatch();

  const onClick = () => {
    setClicked(true);
    const bappName = 'TT_APP';
    const successLink = '';
    const failLink = '';
    const requestConfig: AxiosRequestConfig = {
      method: 'post',
      url: 'https://a2a-api.klipwallet.com/v2/a2a/prepare',
      data: {
        bapp: { name: bappName },
        callback: { success: successLink, fail: failLink },
        type: 'auth',
      },
    };
    axios(requestConfig).then((res) => {
      dispatch(klipActions.set_requestKey(res.data.request_key));
      dispatch(klipActions.set_status(res.data.status));
    });
  };

  const wrapperStyle = css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 80vw;
    max-width: 1100px;
    height: 90vh;
  `;

  const klipLogoStyle = css`
    width: 200px;
    height: 200px;
    background-image: url("data:image/svg+xml,%3Csvg width='46' height='24' viewBox='0 0 46 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.8307 5.35447L45.7724 5.05476C45.1425 1.92507 42.5644 0 39.0095 0H31.3753H7.01275C3.45509 0 0.854827 1.94525 0.224881 5.07781L0.166605 5.37752C0.0528258 6.06052 -0.00267598 6.74063 9.91104e-05 7.57061V16.3343C0.00518621 17.3327 0.0942012 18.0697 0.10902 18.1924L0.111103 18.2104L0.116653 18.2421C0.535692 21.8473 3.11375 24 7.01275 24H28.8111H28.8805H30.1404H30.1431C30.3457 24 30.5094 23.83 30.5094 23.6196V23.6167V9.42651V9.42363C30.5094 9.21326 30.3457 9.04323 30.1431 9.04323H30.1404H28.8111H28.8083C28.6057 9.04323 28.442 9.21326 28.442 9.42363V9.42651V21.8646H7.52892C4.06561 21.8646 2.07864 19.6715 2.07587 16.4121L2.07864 7.55043C2.07864 4.26225 4.06561 2.14409 7.52892 2.14409H35.1411H38.4934C41.9567 2.14409 43.9215 4.23919 43.9215 7.52738L43.9242 16.3862C43.9215 19.6455 41.9539 21.8501 38.4906 21.8501L37.783 21.8588C37.6359 21.8602 37.4985 21.861 37.3611 21.8617C37.2238 21.8624 37.0864 21.8631 36.9393 21.8646H36.5425C36.3399 21.8646 36.1762 22.0346 36.1762 22.245V22.2478V23.6081V23.611C36.1762 23.8213 36.3399 23.9914 36.5425 23.9914H36.8089L37.4721 23.9885C37.5969 23.9885 37.7217 23.9856 37.8465 23.9827L37.8468 23.9827H39.0123C42.9113 23.9827 45.4644 21.8184 45.8834 18.2161L45.889 18.1844L45.8911 18.1668C45.9062 18.0452 45.9975 17.3077 46 16.3084V7.54755C46 6.71758 45.9417 6.03746 45.8307 5.35447ZM19.1428 15.5216C19.1428 16.9567 20.0086 17.9337 21.299 17.9337H21.8762C22.0788 17.9337 22.2453 17.7636 22.2453 17.5504V16.3515V16.3487C22.2453 16.2507 22.2092 16.1527 22.1398 16.0778C22.0677 16.0028 21.9733 15.9654 21.879 15.9683H21.8762H21.213V6.38036V6.37747C21.213 6.1671 21.0492 5.99707 20.8467 5.99707H20.8439H20.8411H19.5118H19.5091C19.3065 5.99707 19.1428 6.1671 19.1428 6.37747V15.5216ZM23.7937 10.2016V10.1988C23.7937 9.98839 23.9575 9.81836 24.16 9.81836H24.1628H25.4921H25.4949C25.6974 9.81836 25.8612 9.98839 25.8612 10.1988V10.2016V15.9711H26.5078H26.5105C26.6049 15.9682 26.6992 16.0057 26.7714 16.0806C26.8047 16.1152 26.8324 16.1584 26.8491 16.2016C26.8657 16.2506 26.8768 16.2996 26.8768 16.3486V16.3515V17.5504V17.5532C26.8768 17.7636 26.7131 17.9336 26.5105 17.9336H26.5078H25.9527C24.6623 17.9336 23.7937 16.9682 23.7937 15.5331V10.2016ZM17.5581 6.53905C17.5634 6.52985 17.5665 6.51948 17.5694 6.50943C17.5711 6.50374 17.5728 6.49815 17.5748 6.49294C17.5831 6.46701 17.5886 6.44107 17.5886 6.41513C17.5914 6.40072 17.5831 6.31139 17.5803 6.29121C17.5692 6.24511 17.5498 6.20764 17.5276 6.1673L17.5235 6.16012C17.5172 6.14893 17.5118 6.13938 17.5026 6.12983C17.4943 6.12118 17.486 6.11326 17.4776 6.10533L17.4776 6.10527C17.4693 6.09737 17.461 6.08946 17.4527 6.08084C17.4443 6.07508 17.4367 6.06931 17.4291 6.06355C17.4214 6.05779 17.4138 6.05202 17.4055 6.04626C17.4008 6.04382 17.3961 6.04116 17.3914 6.03845C17.3792 6.03157 17.3667 6.02446 17.3528 6.02032C17.3195 6.00591 17.2279 5.99438 17.2279 5.99438H15.7044H15.7016C15.6877 5.99438 15.6627 5.99438 15.6489 5.99727L15.63 6.00166C15.605 6.00741 15.5871 6.01152 15.5601 6.0232C15.5157 6.04338 15.474 6.06931 15.4407 6.10678L10.7536 10.2912C10.2374 10.8272 10.1903 11.6774 10.6454 12.2682L15.3963 17.7667C15.4 17.7724 15.4048 17.7768 15.41 17.7816C15.4128 17.7841 15.4156 17.7868 15.4185 17.7898L15.4352 17.8071C15.4657 17.8359 15.499 17.8589 15.5351 17.8762L15.5408 17.8789L15.5448 17.8806C15.5483 17.882 15.5517 17.8834 15.5545 17.8849C15.5934 17.8993 15.635 17.9108 15.6794 17.9108H15.6822H17.239H17.2418H17.2445C17.2473 17.9108 17.2501 17.9079 17.2529 17.9079C17.2917 17.9079 17.3306 17.8993 17.3639 17.8849C17.3777 17.8791 17.3916 17.8733 17.4083 17.8647C17.4305 17.8532 17.4527 17.8359 17.4749 17.8186C17.4804 17.8128 17.4867 17.8078 17.4929 17.8027C17.4991 17.7977 17.5054 17.7927 17.5109 17.7869C17.5359 17.7581 17.5581 17.7264 17.5748 17.6918L17.5748 17.6901L17.575 17.6892C17.5753 17.6884 17.576 17.6877 17.5775 17.686C17.5822 17.6764 17.5849 17.6647 17.5873 17.6544L17.5886 17.6486C17.5998 17.6169 17.6053 17.5823 17.6081 17.5506V17.516C17.6053 17.4353 17.5803 17.3546 17.5304 17.2883L12.4797 11.2797L17.486 6.64856C17.5165 6.61686 17.5415 6.5794 17.5581 6.53905ZM25.4893 8.10087H24.1573C23.9991 8.10087 23.8686 7.99424 23.8131 7.85303C23.7993 7.81268 23.7882 7.76945 23.7882 7.72334V6.37752V6.37464C23.7882 6.16715 23.9519 6 24.1545 6H24.1573H25.4865H25.4893C25.6391 6 25.7696 6.0951 25.8251 6.23055C25.8445 6.27378 25.8556 6.32565 25.8556 6.37752V7.72334C25.8556 7.77522 25.8445 7.82421 25.8251 7.87032C25.7696 8.00576 25.6419 8.10087 25.4893 8.10087ZM9.3271 6.36307C9.3271 6.15269 9.16337 5.98267 8.96079 5.98267H8.95802H7.62875H7.62597C7.58157 5.98267 7.53995 5.99419 7.49832 6.0086L7.46502 6.02589C7.43727 6.0403 7.41229 6.05759 7.39009 6.07777C7.38593 6.08209 7.38107 6.08641 7.37622 6.09073C7.37136 6.09506 7.3665 6.09938 7.36234 6.1037C7.33459 6.13252 7.31239 6.1671 7.29574 6.20457C7.29574 6.20745 7.29296 6.21033 7.29019 6.21321C7.27076 6.25932 7.25966 6.30831 7.25966 6.36307V17.5245C7.25966 17.5763 7.27076 17.6282 7.29019 17.6743C7.34569 17.8126 7.47612 17.9077 7.62597 17.9077H7.62875H8.95802H8.96079C9.16337 17.9077 9.3271 17.7377 9.3271 17.5273V17.5245V6.36883V6.36307ZM38.6544 14.0579L38.6377 14.127C38.3158 15.738 37.0365 16.7466 35.241 16.7495H34.0672H31.8832H31.8804C31.6778 16.7495 31.5141 16.5795 31.5141 16.3691V16.3662V15.006C31.5141 14.9939 31.5171 14.9818 31.5201 14.9697C31.5221 14.9616 31.5241 14.9535 31.5252 14.9455C31.527 14.9359 31.5283 14.9263 31.5295 14.9167C31.532 14.8974 31.5344 14.8782 31.5418 14.859C31.5585 14.8216 31.5807 14.787 31.6084 14.7553C31.6112 14.7524 31.6133 14.7488 31.6154 14.7452C31.6174 14.7416 31.6195 14.738 31.6223 14.7351C31.6251 14.7322 31.6278 14.7308 31.6306 14.7293C31.6334 14.7279 31.6362 14.7265 31.6389 14.7236C31.6695 14.6976 31.7028 14.6717 31.7416 14.6544C31.7603 14.6466 31.7803 14.6441 31.8006 14.6415C31.8105 14.6403 31.8205 14.639 31.8304 14.6371C31.8386 14.6359 31.8457 14.6337 31.8528 14.6315C31.8625 14.6285 31.8719 14.6256 31.8832 14.6256H34.0672H34.9746C36.204 14.6256 36.8284 14.0463 36.8284 12.9051V12.8648C36.8284 11.7495 36.204 11.1703 34.9746 11.1703H34.0672H31.8832C31.8332 11.1703 31.7833 11.1587 31.7389 11.1386C31.6528 11.1011 31.5807 11.029 31.5446 10.9368C31.5252 10.8907 31.5141 10.8388 31.5141 10.787V9.42674C31.5141 9.32011 31.5557 9.22501 31.6223 9.15585C31.6889 9.08669 31.7805 9.04346 31.8804 9.04346H34.0644H35.1966C37.142 9.04346 38.4795 10.1789 38.6932 12.006C38.6988 12.0377 38.8292 13.0089 38.6683 13.9829L38.6544 14.0579Z' fill='white'/%3E%3C/svg%3E%0A");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.7;
  `;

  const buttonWrapperStyle = css`
    display: ${clicked ? 'none' : 'flex'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
  const klipPictureStyle = css`
    width: 500px;
    height: 400px;
    background-image: url('/static/klip-background.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.45;
  `;
  const qrCodeWrapperStyle = css`
    display: ${clicked ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
  const qrCodeStyle = css`
    padding: 1em;
    opacity: 0.7;
  `;
  const qrCodeTextWrapperStyle = css`
    text-align: center;
    padding: 0.5em;
  `;
  const qrCodeTextStyle = css`
    font-size: 1.2em;
    color: white;
    opacity: 0.8;
    padding: 0;
    margin: 0.3em 0;
  `;

  const buttonStyle = css`
    font-size: 1.5em;
    font-weight: 500;
    color: white;
    background-clip: text;
    background: rgba(0, 0, 0, 0);
    border: 0.15em solid white;
    border-radius: 0.5em;
    opacity: 0.8;
    padding: 0.3em;

    :hover {
      background-color: rgba(255, 255, 255, 0.5);
      transition-duration: 0.5s;
      cursor: pointer;
    }
  `;

  return (
    <div css={wrapperStyle}>
      <div css={klipLogoStyle}></div>
      <div css={buttonWrapperStyle}>
        <div css={klipPictureStyle}></div>
        <button css={buttonStyle} onClick={onClick}>
          Klip으로 로그인
        </button>
      </div>
      <div css={qrCodeWrapperStyle}>
        <div css={qrCodeStyle}>
          <KlipAddress />
        </div>
        <div css={qrCodeTextWrapperStyle}>
          {klipState.status === 'completed' ? (
            <p css={qrCodeTextStyle}>로그인에 성공했습니다.</p>
          ) : (
            <>
              <p css={qrCodeTextStyle}>카카오톡이 설치된 휴대폰으로</p>
              <p css={qrCodeTextStyle}>QR 코드를 인식하여 클립에 로그인하세요.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KlipLogin;
