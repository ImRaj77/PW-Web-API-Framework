import {test as baseTest} from '@playwright/test';

import { ApiHelper } from '../api/ApiHelper';

// define the type for API fixtures
type ApiFixtures = {
    apiHelper: ApiHelper
}

export let test = baseTest.extend<ApiFixtures>({

    apiHelper : async ({request}, use) => {                 // use :-> default export 
        let apiHelper = new ApiHelper(request, process.env.API_BASE_URL!);
        await use(apiHelper);
    }
})

export {expect} from '@playwright/test';