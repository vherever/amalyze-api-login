export interface UserModel {
  email: string;
  entity: UserEntity;
  firstname: string;
  lastname: string;
  id: string;
  navigation: UserNavigationModel[];
  username: string;
}
export interface UserEntity {
  city: string;
  company: string;
  country: string;
  email: string;
  fax: string;
  id: string;
  modules: any[];
  phone: string;
  street: string;
  zip: string;
}
export interface UserNavigationModel {
  absolute: boolean;
  disabled: boolean;
  icon: string;
  name: string;
  pos: number;
  route: string;
}
