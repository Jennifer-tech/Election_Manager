export const HOME_ROUTE = "/";
export const ELECTIONS = "/elections";
export const ELECTION_CATEGORIES = (election_id: number) =>
  `/elections/${election_id}/categories`;
export const STATISTICS_ROUTE = "/statistics";




export const POSITION_STATISTICS_ROUTE = (id: string) => `/statistics/${id}`
export const SELECTED_POSITION = "/selected-position";
export const SELECTED_CANDIDATE = "/selected-candidate";
export const ONGOING_ELECTION = "/ongoing-election";
export const ELECTORAL_POSITION_STAT = "/electoral-position-stat";
