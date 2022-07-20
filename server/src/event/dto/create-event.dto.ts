export class CreateEventDto {
  event_id: number;
  title: string;
  promoter: string;
  address: string;
  location: string;
  category: string;
  type: string;
  thumnail: string;
  token_image_url: string;
  price: [];
  contents: string;
  option: [];
  recruit_start_date: number;
  recruit_end_date: number;
  event_start_date: number;
  event_end_date: number;
  created_date: number;
  modified_date: number;
  remaining: number;
  banner: boolean;
}
