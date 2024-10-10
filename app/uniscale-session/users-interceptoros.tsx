import { PlatformInterceptorBuilder, FeatureContext, Result } from '@uniscale-sdk/ActorCharacter-InfoPanel';
import { Patterns as InfoPanelPlaygroundUsersPatterns } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Users/Patterns'
import { Empty as InfoPanelPlaygroundUsersUsersCoreContractsEmpty } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Users/Users/CoreContracts/Empty'
import { ReplacePermissionInput as InfoPanelPlaygroundUsersUsersAccessEndpointContractsReplacePermissionInput } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Users/Users/Access/EndpointContracts/ReplacePermissionInput'
import { UserFull as InfoPanelPlaygroundUsersUsersUserFull } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Users/Users/UserFull'
import { ReplaceDepartmentsInput as InfoPanelPlaygroundUsersUsersAccessEndpointContractsReplaceDepartmentsInput } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Users/Users/Access/EndpointContracts/ReplaceDepartmentsInput'
import { randomUUID } from 'crypto';

export class UsersInterceptorHandler {
setup(builder: PlatformInterceptorBuilder): void {
  builder.interceptMessage(InfoPanelPlaygroundUsersPatterns.users.access.replaceDepartments.allMessageUsages,InfoPanelPlaygroundUsersPatterns.users.access.replaceDepartments.handleAsync(this.replaceDepartmentsHandler))
  builder.interceptRequest(InfoPanelPlaygroundUsersPatterns.users.getUsers.allRequestUsages,InfoPanelPlaygroundUsersPatterns.users.getUsers.handleAsync(this.getUsersHandler))
  builder.interceptMessage(InfoPanelPlaygroundUsersPatterns.users.access.replacePermission.allMessageUsages,InfoPanelPlaygroundUsersPatterns.users.access.replacePermission.handleAsync(this.replacePermissionHandler))
  builder.interceptRequest(InfoPanelPlaygroundUsersPatterns.users.currentSession.getCurrentUser.allRequestUsages,InfoPanelPlaygroundUsersPatterns.users.currentSession.getCurrentUser.handleAsync(this.getCurrentUserHandler))
}

replaceDepartmentsHandler(input?: InfoPanelPlaygroundUsersUsersAccessEndpointContractsReplaceDepartmentsInput,ctx?: FeatureContext): Promise<Result> {
  /** 
   * Using the Uniscale SDK to implement a request interceptor handler In Uniscale the Result object is
   * used to return responses. For a successful response the Ok method is used. For validation errors
   * the Result.badRequest method is used and for other errors the Result.internalServerError method is
   * used
   * 
   * To validate terminologies one of the following overloads can be used (all async):
   *   validateTerminologyCode(terminology: string, codeToValidate: string): Promise<Result>
   *   validateTerminology(terminology: string, codesToValidate: string[]): Promise<Result>
   *   validateTerminologyCodes(codesToValidate: CodeInTerminology[]): Promise<Result>
   * 
   * The endpoint functionality to implement
   * Change department access
   *   We need to be able to set department access for users. There is a restriction that that admin and
   *   publisher must have at least one department.
   *   
   *   The acceptance criteria defined for the flow is: If the user is an admin or a publisher the minimum
   *   amount of departments are 1
   *   
   *   The following existing class is used for input:
   *   InfoPanelPlayground.Users.Users.Access.EndpointContracts.ReplaceDepartmentsInput
   *     # The departments property is a Terminology (id: 5ef578c6-2271-4073-9717-b2344c6a39ee) with the following codes:
   *     #   HR - HR
   *     #   CX - Customer care
   *     #   Development - Development
   *     #   Sales - Sales
   *     #   Infrastructure - IT infrastructure
   *     #   Management - Management
   *     #   Product - Product
   *     departments: string[]
   * 
   * The available error codes to return are:
   * ErrorCodes.Users.Access.PublishersRequireAtLeastOneDepartment
   */
  return Promise.resolve(Result.ok(undefined))
}

getUsersHandler(input?: InfoPanelPlaygroundUsersUsersCoreContractsEmpty,ctx?: FeatureContext): Promise<Result<InfoPanelPlaygroundUsersUsersUserFull[]>> {
  /** 
   * Using the Uniscale SDK to implement a request interceptor handler In Uniscale the Result object is
   * used to return responses. For a successful response the Ok method is used. For validation errors
   * the Result.badRequest method is used and for other errors the Result.internalServerError method is
   * used
   * 
   * The endpoint functionality to implement
   * List of all users
   *   We need to query for and return all users containing the user id, name, current departments, signup
   *   date and current permission
   *   
   *   The acceptance criteria defined for the flow is: The list must be sorted by user name
   *   
   *   The following existing class is used for input:
   *   InfoPanelPlayground.Users.Users.CoreContracts.Empty
   *   
   *   The following existing class is used for output:
   *   InfoPanelPlayground.Users.Users.UserFull
   *     name: string
   *     # The permission property is a Terminology (id: 8e284b8b-1bad-4fed-a52c-94e295f4850f) with the following codes:
   *     #   Viewer - Viewer
   *     #   Admin - Admin
   *     #   Publisher - Publisher
   *     permission: string
   *     joinedAt: Date
   *     profilePicture: string
   *     # The departments property is a Terminology (id: 5ef578c6-2271-4073-9717-b2344c6a39ee) with the following codes:
   *     #   HR - HR
   *     #   CX - Customer care
   *     #   Development - Development
   *     #   Sales - Sales
   *     #   Infrastructure - IT infrastructure
   *     #   Management - Management
   *     #   Product - Product
   *     departments: string[]
   *     userIdentifier: string
   */
  const resultValue = [InfoPanelPlaygroundUsersUsersUserFull.samples().defaultSample()]
  return Promise.resolve(Result.ok(resultValue))
}

replacePermissionHandler(input?: InfoPanelPlaygroundUsersUsersAccessEndpointContractsReplacePermissionInput,ctx?: FeatureContext): Promise<Result> {
  /** 
   * Using the Uniscale SDK to implement a request interceptor handler In Uniscale the Result object is
   * used to return responses. For a successful response the Ok method is used. For validation errors
   * the Result.badRequest method is used and for other errors the Result.internalServerError method is
   * used
   * 
   * To validate terminologies one of the following overloads can be used (all async):
   *   validateTerminologyCode(terminology: string, codeToValidate: string): Promise<Result>
   *   validateTerminology(terminology: string, codesToValidate: string[]): Promise<Result>
   *   validateTerminologyCodes(codesToValidate: CodeInTerminology[]): Promise<Result>
   * 
   * The endpoint functionality to implement
   * Setting the access level of a user
   *   We need to be able to set the access level of a user
   *   
   *   The acceptance criteria defined for the flow is: Admin and publisher can only be selected if the
   *   user has access to at least one department
   *   
   *   The following existing class is used for input:
   *   InfoPanelPlayground.Users.Users.Access.EndpointContracts.ReplacePermissionInput
   *     # The permission property is a Terminology (id: 8e284b8b-1bad-4fed-a52c-94e295f4850f) with the following codes:
   *     #   Viewer - Viewer
   *     #   Admin - Admin
   *     #   Publisher - Publisher
   *     permission: string
   * 
   * The available error codes to return are:
   * ErrorCodes.Users.Access.PublishersRequireAtLeastOneDepartment
   */
  return Promise.resolve(Result.ok(undefined))
}

getCurrentUserHandler(input?: InfoPanelPlaygroundUsersUsersCoreContractsEmpty,ctx?: FeatureContext): Promise<Result<InfoPanelPlaygroundUsersUsersUserFull>> {
  /** 
   * Using the Uniscale SDK to implement a request interceptor handler In Uniscale the Result object is
   * used to return responses. For a successful response the Ok method is used. For validation errors
   * the Result.badRequest method is used and for other errors the Result.internalServerError method is
   * used
   * 
   * The endpoint functionality to implement
   * User session information
   *   Gets the user session information for the logged in user
   *   
   *   The following existing class is used for input:
   *   InfoPanelPlayground.Users.Users.CoreContracts.Empty
   *   
   *   The following existing class is used for output:
   *   InfoPanelPlayground.Users.Users.UserFull
   *     name: string
   *     # The permission property is a Terminology (id: 8e284b8b-1bad-4fed-a52c-94e295f4850f) with the following codes:
   *     #   Viewer - Viewer
   *     #   Admin - Admin
   *     #   Publisher - Publisher
   *     permission: string
   *     joinedAt: Date
   *     profilePicture: string
   *     # The departments property is a Terminology (id: 5ef578c6-2271-4073-9717-b2344c6a39ee) with the following codes:
   *     #   HR - HR
   *     #   CX - Customer care
   *     #   Development - Development
   *     #   Sales - Sales
   *     #   Infrastructure - IT infrastructure
   *     #   Management - Management
   *     #   Product - Product
   *     departments: string[]
   *     userIdentifier: string
   */
  const resultValue = {
    name: 'Mr Ackenhausen',
    permission: 'Admin',
    joinedAt: new Date(),
    profilePicture: 'https://media.licdn.com/dms/image/D5603AQENN6POVSpquQ/profile-displayphoto-shrink_200_200/0/1701948207815?e=2147483647&v=beta&t=RKIf7AsrYPghQ4nopY1kuroRadf51KX3jcAY15m21Lo',
    departments: ['HR', 'Development'],
    userIdentifier: crypto.randomUUID()
  }
  return Promise.resolve(Result.ok(resultValue))
}
}