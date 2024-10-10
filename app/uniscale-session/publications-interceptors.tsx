import { PlatformInterceptorBuilder, FeatureContext, Result } from '@uniscale-sdk/ActorCharacter-InfoPanel';
import { NewPublicationInput as InfoPanelPlaygroundPublicationsPublicationsEndpointContractsNewPublicationInput } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications/EndpointContracts/NewPublicationInput'
import { SearchAndFilterPublicationsInput as InfoPanelPlaygroundPublicationsPublicationsEndpointContractsSearchAndFilterPublicationsInput } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications/EndpointContracts/SearchAndFilterPublicationsInput'
import { PublicationFull as InfoPanelPlaygroundPublicationsPublicationsPublicationFull, PublicationFull } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications/PublicationFull'
import { Patterns as InfoPanelPlaygroundPublicationsPatterns } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Patterns'
import { Empty as InfoPanelPlaygroundPublicationsPublicationsCoreDataEmpty } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications/CoreData/Empty'

const publications = new Map<string, PublicationFull>()

export class PublicationsInterceptorHandler {
setup(builder: PlatformInterceptorBuilder): void {
  builder.interceptRequest(InfoPanelPlaygroundPublicationsPatterns.publications.newPublication.allRequestUsages,InfoPanelPlaygroundPublicationsPatterns.publications.newPublication.handleAsync(this.newPublicationHandler))
  builder.interceptRequest(InfoPanelPlaygroundPublicationsPatterns.publications.getNumberOfActionsSuggested.allRequestUsages,InfoPanelPlaygroundPublicationsPatterns.publications.getNumberOfActionsSuggested.handleAsync(this.getNumberOfActionsSuggestedHandler))
  builder.interceptRequest(InfoPanelPlaygroundPublicationsPatterns.publications.searchAndFilterPublications.allRequestUsages,InfoPanelPlaygroundPublicationsPatterns.publications.searchAndFilterPublications.handleAsync(this.searchAndFilterPublicationsHandler))
}

newPublicationHandler(input?: InfoPanelPlaygroundPublicationsPublicationsEndpointContractsNewPublicationInput,ctx?: FeatureContext): Promise<Result<InfoPanelPlaygroundPublicationsPublicationsPublicationFull>> {
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
   * Post publication
   *   The user should be able to post a publication. Title, author, publication type and short message is
   *   required.
   *   
   *   The acceptance criteria defined for the flow is:
   *     Title, author, publication type and short message is required
   *     Should only be allowed to post if the user is an admin or a publisher
   *   
   *   The following existing class is used for input:
   *   InfoPanelPlayground.Publications.Publications.EndpointContracts.NewPublicationInput
   *     # The publicationType property is a Terminology (id: 5401420b-cee3-4455-8044-c2f8fc046e06) with the following codes:
   *     #   Casual - Casual
   *     #   Important - Important
   *     publicationType: string
   *     body: string
   *     shortMessage: string
   *     actionable: boolean
   *     # The targetDepartments property is a Terminology (id: 69a49938-29d2-413f-80d5-3555bb13c267) with the following codes:
   *     #   HR - HR
   *     #   CX - Customer care
   *     #   Development - Development
   *     #   Sales - Sales
   *     #   Infrastructure - IT infrastructure
   *     #   Management - Management
   *     #   Product - Product
   *     targetDepartments: string[]
   *     title: string
   *     # The author property is a Terminology (id: 69a49938-29d2-413f-80d5-3555bb13c267) with the following codes:
   *     #   HR - HR
   *     #   CX - Customer care
   *     #   Development - Development
   *     #   Sales - Sales
   *     #   Infrastructure - IT infrastructure
   *     #   Management - Management
   *     #   Product - Product
   *     author: string
   *   
   *   The following existing class is used for output:
   *   InfoPanelPlayground.Publications.Publications.PublicationFull
   *     publishedAt: Date
   *     body: string
   *     shortMessage: string
   *     actionable: boolean
   *     # The publicationType property is a Terminology (id: 5401420b-cee3-4455-8044-c2f8fc046e06) with the following codes:
   *     #   Casual - Casual
   *     #   Important - Important
   *     publicationType: string
   *     publicationIdentifier: string
   *     # The targetDepartments property is a Terminology (id: 69a49938-29d2-413f-80d5-3555bb13c267) with the following codes:
   *     #   HR - HR
   *     #   CX - Customer care
   *     #   Development - Development
   *     #   Sales - Sales
   *     #   Infrastructure - IT infrastructure
   *     #   Management - Management
   *     #   Product - Product
   *     targetDepartments: string[]
   *     title: string
   *     # The author property is a Terminology (id: 69a49938-29d2-413f-80d5-3555bb13c267) with the following codes:
   *     #   HR - HR
   *     #   CX - Customer care
   *     #   Development - Development
   *     #   Sales - Sales
   *     #   Infrastructure - IT infrastructure
   *     #   Management - Management
   *     #   Product - Product
   *     author: string
   */

  if (!input) {
    return Promise.resolve(Result.badRequest("invalid.input", "Input is required") as unknown as Result<PublicationFull>);
  }

  const { title, author, publicationType, shortMessage, body, actionable, targetDepartments } = input;

  // Validate required fields
  if (!title || !author || !publicationType || !shortMessage) {
    const result = Result.badRequest("missing.fields", "Title, author, publication type, and short message are required") as unknown as Result<PublicationFull>
    return Promise.resolve(result);
  }

  // Check if user is admin or publisher
  /*const userRoles = ctx?.user?.roles || [];
  if (!userRoles.includes("admin") && !userRoles.includes("publisher")) {
    return Promise.resolve(Result.badRequest("unauthorized", "User is not authorized to post a publication"));
  }*/

  // Create new publication
  const publication: PublicationFull = {
    publicationIdentifier: `${Date.now()}`, // Generate a unique identifier
    title,
    author,
    publicationType,
    shortMessage,
    body,
    actionable,
    targetDepartments,
    publishedAt: new Date()
  };

  // Store the publication in the hashmap
  publications.set(publication.publicationIdentifier as string, publication);

  return Promise.resolve(Result.ok(publication));
}

getNumberOfActionsSuggestedHandler(input?: InfoPanelPlaygroundPublicationsPublicationsCoreDataEmpty,ctx?: FeatureContext): Promise<Result<number>> {
  /** 
   * Using the Uniscale SDK to implement a request interceptor handler In Uniscale the Result object is
   * used to return responses. For a successful response the Ok method is used. For validation errors
   * the Result.badRequest method is used and for other errors the Result.internalServerError method is
   * used
   * 
   * The endpoint functionality to implement
   * Get actions suggested count for badge
   *   Should get the number of actionable publications for the user within the next 4 weeks.
   *   
   *   The acceptance criteria defined for the flow is: The count needs to be based on publications up
   *   until 4 weeks back
   *   
   *   The following existing class is used for input:
   *   InfoPanelPlayground.Publications.Publications.CoreData.Empty
   *   
   *   The following existing class is used for output:: number
   */

  const now = new Date();
  const fourWeeksAgo = new Date(now);
  fourWeeksAgo.setDate(now.getDate() - 28);

  const actionablePublications = Array.from(publications.values()).filter(publication => {
    return publication.actionable && publication.publishedAt !== undefined && publication.publishedAt >= fourWeeksAgo;
  });

  return Promise.resolve(Result.ok(actionablePublications.length));
}

searchAndFilterPublicationsHandler(input?: InfoPanelPlaygroundPublicationsPublicationsEndpointContractsSearchAndFilterPublicationsInput,ctx?: FeatureContext): Promise<Result<InfoPanelPlaygroundPublicationsPublicationsPublicationFull[]>> {
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
   * Search and filter publicatoins
   *   This endpoint needs to contain both search capabilities, category filter, actionable filter and
   *   current week filter.
   *   
   *   The acceptance criteria defined for the flow is:
   *     Needs to be able to search within publication title, short description and body
   *     The search needs to be a multi word wildcard search
   *     The response should be sorted by published date and not relevance
   *     It needs to support a publication type filter (casual, important)
   *     It needs to support actionable filter
   *     It needs to be able to if set only return data from the current week
   *   
   *   The following existing class is used for input:
   *   InfoPanelPlayground.Publications.Publications.EndpointContracts.SearchAndFilterPublicationsInput
   *     # The publicationType property is a Terminology (id: 5401420b-cee3-4455-8044-c2f8fc046e06) with the following codes:
   *     #   Casual - Casual
   *     #   Important - Important
   *     publicationType: string
   *     onlyCurrentWeek: boolean
   *     onlyActionable: boolean
   *     searchQuery: string
   *   
   *   The following existing class is used for output:
   *   InfoPanelPlayground.Publications.Publications.PublicationFull
   *     publishedAt: Date
   *     body: string
   *     shortMessage: string
   *     actionable: boolean
   *     # The publicationType property is a Terminology (id: 5401420b-cee3-4455-8044-c2f8fc046e06) with the following codes:
   *     #   Casual - Casual
   *     #   Important - Important
   *     publicationType: string
   *     publicationIdentifier: string
   *     # The targetDepartments property is a Terminology (id: 69a49938-29d2-413f-80d5-3555bb13c267) with the following codes:
   *     #   HR - HR
   *     #   CX - Customer care
   *     #   Development - Development
   *     #   Sales - Sales
   *     #   Infrastructure - IT infrastructure
   *     #   Management - Management
   *     #   Product - Product
   *     targetDepartments: string[]
   *     title: string
   *     # The author property is a Terminology (id: 69a49938-29d2-413f-80d5-3555bb13c267) with the following codes:
   *     #   HR - HR
   *     #   CX - Customer care
   *     #   Development - Development
   *     #   Sales - Sales
   *     #   Infrastructure - IT infrastructure
   *     #   Management - Management
   *     #   Product - Product
   *     author: string
   */

  if (!input) {
    return Promise.resolve(Result.badRequest("invalid.input", "Input is required") as unknown as Result<PublicationFull[]>);
  }

  const { publicationType, onlyCurrentWeek, onlyActionable, searchQuery } = input;

  let filteredPublications = Array.from(publications.values());

  // Filter by publication type
  if (publicationType) {
    filteredPublications = filteredPublications.filter(publication => publication.publicationType === publicationType);
  }

  // Filter by actionable
  if (onlyActionable) {
    filteredPublications = filteredPublications.filter(publication => publication.actionable);
  }

  // Filter by current week
  if (onlyCurrentWeek) {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    filteredPublications = filteredPublications.filter(publication => publication.publishedAt !== undefined && publication.publishedAt >= startOfWeek);
  }

  // Search within title, short description, and body
  if (searchQuery) {
    const searchTerms = searchQuery.split(' ').map(term => term.toLowerCase());
    filteredPublications = filteredPublications.filter(publication => {
      const content = `${publication.title} ${publication.shortMessage} ${publication.body}`.toLowerCase();
      return searchTerms.every(term => content.includes(term));
    });
  }

  // Sort by published date
  filteredPublications.sort((a, b) => {
    if (!b.publishedAt || !a.publishedAt) return 0;
    return b.publishedAt.getTime() - a.publishedAt.getTime();
  });

  return Promise.resolve(Result.ok(filteredPublications));
}
}