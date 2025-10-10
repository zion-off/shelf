import { auth } from '@/auth';
import Header from '@/components/navigation/header';
import ApiKeySection from '@/components/settings/apiKeySection';
import { getUserApiKeys } from '@/actions/user/getUserApiKeys';

export default async function Settings() {
  const session = await auth();
  const user = session?.user;
  const name = user?.name;

  // Fetch user's API keys
  const apiKeysResult = await getUserApiKeys();
  const apiKeys = apiKeysResult.success ? apiKeysResult.apiKeys || [] : [];

  return (
    <div className="h-full flex flex-col">
      <Header />
      {/*actual page content
      probably need to change this later -- adding header and page content like this to every page is awwful*/}
      <div className="flex flex-1 w-full justify-center items-center">
        <div className="max-w-2xl w-full space-y-6 p-6">
          <div>
            <h2 className="font-switzer text-2xl font-bold mb-4">Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Name</h3>
              <p className="text-sm text-muted-foreground">{name}</p>
            </div>

            <div>
              <ApiKeySection initialApiKeys={apiKeys} showHeading={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
