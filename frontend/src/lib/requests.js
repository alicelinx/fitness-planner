export const loginUser = async (email, password) => {
  try {
    const user = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    return user.json();
  } catch (e) {
    console.error({ e });
  }

};