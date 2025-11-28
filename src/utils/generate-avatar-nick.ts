export function generateAvatarNick(name: string){
  const separateNames = name.split(" ")

  const firstWordOfName = separateNames[0][0]
  const secondWordOfName = separateNames[1]?.[0] ?? separateNames[0][1]

  const avatarNick = firstWordOfName + secondWordOfName

  return avatarNick.toUpperCase()
}