import ApiUrlBuilder from "@/services/@core/module/ApiUrlBuilder";

describe('ApiUrlBuilder', () => {
    it('should build correct login URL', () => {
        const loginUrl = ApiUrlBuilder.MockServer.login;
        expect(loginUrl.baseUrl).toBe('https://cc370007-aa02-4685-801b-ed327141d2d6.mock.pstmn.io');
        expect(loginUrl.url).toBe('/userLogin');
        expect(loginUrl.baseUrl + loginUrl.url).toBe('https://cc370007-aa02-4685-801b-ed327141d2d6.mock.pstmn.io/userLogin');
    });

    it('should build correct logout URL', () => {
        const logoutUrl = ApiUrlBuilder.MockServer.logout;
        expect(logoutUrl.baseUrl).toBe('https://cc370007-aa02-4685-801b-ed327141d2d6.mock.pstmn.io');
        expect(logoutUrl.url).toBe('/userLogout');
        expect(logoutUrl.baseUrl + logoutUrl.url).toBe('https://cc370007-aa02-4685-801b-ed327141d2d6.mock.pstmn.io/userLogout');
    });

    it('should build correct sportsCategories URL', () => {
        const sportsCategoriesUrl = ApiUrlBuilder.MockServer.sportsCategories;
        expect(sportsCategoriesUrl.baseUrl).toBe('https://cc370007-aa02-4685-801b-ed327141d2d6.mock.pstmn.io');
        expect(sportsCategoriesUrl.url).toBe('sportsCategories');
        expect(sportsCategoriesUrl.baseUrl + sportsCategoriesUrl.url).toBe('https://cc370007-aa02-4685-801b-ed327141d2d6.mock.pstmn.io/sportsCategories');
    });

    it('should build correct oddsDashboard URL', () => {
        const oddsDashboardUrl = ApiUrlBuilder.MockServer.eventList;
        expect(oddsDashboardUrl.baseUrl).toBe('https://cc370007-aa02-4685-801b-ed327141d2d6.mock.pstmn.io');
        expect(oddsDashboardUrl.url).toBe('/events');
        expect(oddsDashboardUrl.baseUrl + oddsDashboardUrl.url).toBe('https://cc370007-aa02-4685-801b-ed327141d2d6.mock.pstmn.io/oddsDashboard');
    });

    it('should build correct leagues URL', () => {
        const oddsDashboardUrl = ApiUrlBuilder.MockServer.leagues;
        expect(oddsDashboardUrl.baseUrl).toBe('https://cc370007-aa02-4685-801b-ed327141d2d6.mock.pstmn.io');
        expect(oddsDashboardUrl.url).toBe('/leagues');
        expect(oddsDashboardUrl.baseUrl + oddsDashboardUrl.url).toBe('https://cc370007-aa02-4685-801b-ed327141d2d6.mock.pstmn.io/leagues');
    });

    it('should build correct locations URL', () => {
        const oddsDashboardUrl = ApiUrlBuilder.MockServer.locations;
        expect(oddsDashboardUrl.baseUrl).toBe('https://cc370007-aa02-4685-801b-ed327141d2d6.mock.pstmn.io');
        expect(oddsDashboardUrl.url).toBe('/locations');
        expect(oddsDashboardUrl.baseUrl + oddsDashboardUrl.url).toBe('https://cc370007-aa02-4685-801b-ed327141d2d6.mock.pstmn.io/locations');
    });
});
