interface IRoleList {
  text: string,
  value: number
}

export const roleList: Array<IRoleList> = [
  { text: '超级管理员', value: 1 },
  { text: '管理员', value: 2 },
  { text: '普通用户', value: 3 }
]
