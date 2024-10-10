import { useEffect } from "react"
import { initializeDispatcher } from "../uniscale-session/dispatcher"
import { userSession } from "../user-session/user-session"

/** 
 * Using the Uniscale SDK to call defined endpoints through a dispatcher session
 * Using the Uniscale dispatcher you can use the Request method in and pass an instance of a class based on the RequestResponseBackendAction
 * base class using the static .With method to set the input. What is passed into the .With. For the result class that comes back. If the Success property is true
 * it has succeeded and you will find the result is in the Value property. If the Success property is false it can use the .Error.Details.UserError
 * to get the error message. It should use the feature class directly as a static class when using the .With method.
 * 
 * View functionality
 *   
 *   There are 2 flows available in this use case:
 *     Navigation to the admin settings
 *       The Admin settings link is only visible and available to admin users. When an admin user clicks on
 *       it it will open the Admin settings view.
 *       
 *       Acceptance criteria: Admin settings link is only visible and available to admin users.
 *     
 *     Profile picture
 *       The profile picture will display the profile picture used in the users Google account
 *   
 *   Endpoints available to implement the flow:
 *     InfoPanelPlayground.Users.Users.CurrentSession.GetCurrentUser
 *       The following existing class is used for input:
 *       InfoPanelPlayground.Users.Users.CoreContracts.Empty
 *       The following existing class is used for output:
 *       InfoPanelPlayground.Users.Users.UserFull
 *         name: string
 *         # The permission property is a Terminology (id: 8e284b8b-1bad-4fed-a52c-94e295f4850f) with the following codes:
 *         #   Viewer - Viewer
 *         #   Admin - Admin
 *         #   Publisher - Publisher
 *         permission: string
 *         joinedAt: Date
 *         profilePicture: string
 *         # The departments property is a Terminology (id: 5ef578c6-2271-4073-9717-b2344c6a39ee) with the following codes:
 *         #   HR - HR
 *         #   CX - Customer care
 *         #   Development - Development
 *         #   Sales - Sales
 *         #   Infrastructure - IT infrastructure
 *         #   Management - Management
 *         #   Product - Product
 *         departments: string[]
 *         userIdentifier: string
 * 
 */
import React, { useState } from "react"
import { UserFull } from "@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Users/Users"

export default function RightToolbar() {
    const [user, setUser] = useState<UserFull | null>(null)

    useEffect(() => {
        const initialize = async () => {
            const dispatcher = await initializeDispatcher()
            const user = (await userSession(dispatcher)).user
            setUser(user)
        }
        initialize()
    }, [])

    if (!user) {
        return null
    }

    return (
        <div className="right-toolbar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {user.permission === "Admin" && (
                <button className="admin-settings-button" style={{ marginRight: '20px' }}>Admin settings</button>
            )}
            <img
                className="profile-picture"
                src={user.profilePicture}
                alt={`${user.name}'s profile`}
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
            />
        </div>
    )
}