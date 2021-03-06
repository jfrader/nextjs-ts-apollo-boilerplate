import 'isomorphic-fetch';

const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const res = await fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Cookie: `Authentication=${token}`,
      }),
      body: JSON.stringify({
        query: `
          query Me {
            me {
              email
            }
          }
        `,
      }),
    });
    const jsonRes = await res.json();
    return !!(jsonRes.data && jsonRes.data.me && jsonRes.data.me.email);
  } catch (e) {
    return false;
  }
};

export default verifyToken;
