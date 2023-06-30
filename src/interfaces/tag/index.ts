import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface TagInterface {
  id?: string;
  name: string;
  business_id?: string;
  created_at?: any;
  updated_at?: any;

  business?: BusinessInterface;
  _count?: {};
}

export interface TagGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  business_id?: string;
}
