import { DispatcherSession } from "@uniscale-sdk/ActorCharacter-InfoPanel"
import { Empty } from "@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications/CoreData"
import { UserFull } from "@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Users/Users"
import { GetCurrentUser } from "@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Users_1_0/ServiceToModule/Users/CurrentSession/UserSessionInformation"

interface UserSession {
    user: UserFull
}

var session: UserSession | null = null

export const userSession = async (dispatcher: DispatcherSession): Promise<UserSession> => {
    if (session == null) {
        const response = await dispatcher.request(GetCurrentUser.with(new Empty()))
        if (!response.success || !response.value) {
            throw new Error(response.error?.details?.technicalError);
        }
        session = { user: response.value }
    }
    return session
}