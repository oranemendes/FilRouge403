import {HouseModel} from "./house.model";

export interface ApiModel {
  message: string;
  success: string;
  list: any[];
  error: boolean;
  errCode: string;
  errMsg: string;
  house: HouseModel;
}
