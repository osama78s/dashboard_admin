import GetUserCookie from '../GetUserCookie/GetUserCookie';
import SearchOnProducts from '../SearchWithClient/SearchWithClient';

export default async function SearchField() {
  const { token }  = await GetUserCookie();
  return (
    <SearchOnProducts token={token} />
  )
}
