import { db } from '../helper/db'

interface IncrementFileReadArgs {
  name: string
  type: 'file' | 'folder'
  from: 'cache' | 'api'
}

async function createStat({ name, type }: Pick<IncrementFileReadArgs, 'name' | 'type'>) {
  const stat = await db.stats.create({ data: { name, type } })

  if (!stat) throw new Error(`cant create stat for : ${type}/${name}`)

  return stat
}

export async function incrementRead({ name, type, from }: IncrementFileReadArgs) {
  try {
    let stats = await db.stats.findFirst({
      where: {
        name,
        type,
      },
    })

    if (!stats) {
      stats = await createStat({ name, type })
    }

    return await db.stats.update({
      where: {
        id: stats.id,
      },
      data: {
        fromApi: from === 'api' ? stats.fromApi + 1 : stats.fromApi,
        fromCach: from === 'cache' ? stats.fromCach + 1 : stats.fromCach,
      },
    })
  } catch (error) {
    return null
  }
}
