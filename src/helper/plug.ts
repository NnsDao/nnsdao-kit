import type { HttpAgent } from '@dfinity/agent';

interface PlugLoginRes {
  agent: Omit<HttpAgent, 'invalidateIdentity' | 'replaceIdentity'>;
  principalId: string;
  accountId: string;
}
let persistTimer: any = null;

export async function plugLogin(whitelist: string[]): Promise<PlugLoginRes | null> {
  if (!globalThis?.ic?.plug) {
    console.error('Please make sure the Plug extension is installed!');
    alert('Please make sure the Plug extension is installed!');
    return null;
  }
  const connected = await globalThis.ic.plug.isConnected();
  if (!connected) {
    try {
      // @ts-ignore
      const publicKey = await globalThis.ic.plug.requestConnect({
        whitelist,
        // onConnectionUpdate:
        // host,
        timeout: 1e4, // auto reject after 10 seconds
      });
      console.log("The connected user's public key is:", publicKey);
    } catch (e) {
      console.error(e);
    }
  }
  if (connected && !globalThis.ic.plug.agent) {
    try {
      await globalThis.ic.plug.createAgent({ whitelist });
    } catch (error) {
      console.error('plug.createAgent', error);
    }
  }
  const autoConnect = async () => {
    const connected = await window.ic.plug.isConnected();
    if (!connected) await window.ic.plug.requestConnect({ whitelist });
  };

  const persistConnect = () => {
    persistTimer && clearTimeout(persistTimer);
    persistTimer = setTimeout(async () => {
      await autoConnect();
      persistConnect();
    }, 3e3);
  };
  persistConnect();
  console.log('Plug login', globalThis.ic.plug.sessionManager);

  return globalThis.ic.plug.sessionManager.sessionData;
}

export async function plugLogout(): Promise<void> {
  // @ts-ignore
  await globalThis.ic.plug.disconnect();
  persistTimer && clearTimeout(persistTimer);
  //Disconnect after
}
