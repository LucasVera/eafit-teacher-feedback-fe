import { ApiFindClassResult, ClassType } from "../types/Class"
import api from "../util/api"

export default {
  async findActiveClass(classId: string): Promise<ClassType> {
    try {
      const activeClass = await api.get<ApiFindClassResult>(`/class/${classId}`)

      if (!activeClass) {
        throw new Error('Error getting active class from api - [service]')
      }

      console.log('activeClass', activeClass, Date.parse(activeClass.class.startedAtUtc))

      return {
        classId: activeClass.class.classId,
        classStartedAt: Date.parse(activeClass.class.startedAtUtc),
        screenshotIntervalSeconds: activeClass.class.screenshotIntervalSeconds,
      }
    }
    catch (ex) {
      console.error('Error getting active class [service]', ex)
      throw ex
    }
  }
}
