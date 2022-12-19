export enum ReponseStatusEnum {
  Success = 'Success',
  Error = 'Error',
  Analysis = 'Analysis',
  none = ''
}

export enum ResponseStatusCodeEnum {
  Success = '0',
  Error = '1',
  repeatRegister = '2'
}

export enum LoginStateEnum {
  notLogin = 'notLogin',
  loading = 'loading',
  alreadyLogin = 'alreadyLogin',
  loginFail = 'loginFail'
}

export enum RegisterStateEnum {
  notRegister = 'notRegister',
  loading = 'loading',
  alreadyRegister = 'alreadyRegister',
  registerFail = 'registerFail'
}

export enum MemberEnum {
  visitor = 'visitor',
  normal = 'normal',
  admin = 'admin'
}

export enum MemberAuthorityEnum {
  visitor = 1,
  normal = 2,
  admin = 9
}

export enum SubViewStateEnum {
  loading = 'loading',
  finish = 'finish'
}

export enum StockType {
  market = 'market',
  cabinet = 'cabinet'
}

export enum StockTypeName {
  market = '上市',
  cabinet = '上櫃'
}
