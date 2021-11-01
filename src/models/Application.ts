import Posting from './Posting'
import Worker from './Worker'

type Application = {
  id: number
  name?: string | undefined // Worker name
  status?: string | undefined
  tags?: string | undefined
  content?: string | undefined
  posting?: Posting | undefined
  createdAt: string | number
  worker?: Worker | undefined
}

export default Application
