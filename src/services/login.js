const users = [
  {
    name: "Ilmoooo",
    username: "ilmo",
    password: "ilmo",
    id: 1
  },
  {
    name: "Ilmo2",
    username: "ilmo2",
    password: "ilmo2",
    id: 2
  }
]

const login = async (credentials) => {
  const user = users.find(user => user.username === credentials.username)
  if (user && user.password === credentials.password) {
    return user
  }
  return null
}

export default { login };
