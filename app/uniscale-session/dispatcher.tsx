import { DispatcherSession, Platform } from "@uniscale-sdk/ActorCharacter-InfoPanel"
import { PublicationsInterceptorHandler } from "./publications-interceptors"
import { UsersInterceptorHandler } from "./users-interceptoros"

var dispatcher: DispatcherSession | null = null

export const initializeDispatcher = async (): Promise<DispatcherSession> => {
    if (dispatcher == null) {
        const platformSession = await Platform.builder()
            .withInterceptors(i => { 
                new PublicationsInterceptorHandler().setup(i) 
                new UsersInterceptorHandler().setup(i) 
            })
            .inspectResponses((result, input, ctx) => {
                if (!result.success) {
                    console.error(result.error?.details?.technicalError)
                }
                console.log(result)
                return result
            })
            .build()
        dispatcher = platformSession
            .asSolution("21e1b2f2-73f1-4890-82ab-ff3df8b6c449");
    }

    return dispatcher;
}