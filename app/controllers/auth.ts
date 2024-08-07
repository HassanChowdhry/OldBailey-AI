export type LoginData = {
  email: string;
  password: string;
};

export type SignupData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: number;
};

export const AUTH_BASE_URL = "http://localhost:8000/api/v1/auth";

export const login = async (formData: LoginData) => {
  try {
    const res = await fetch(`${AUTH_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    if (!res.ok) {
      return { error: "Something went wrong" };
    }

    const token = res.headers.get('Authorization');
    if (token) sessionStorage.setItem("token", token);
    
    return res.json();

  } catch (error) {
    console.error(error);
  }
};

export const signup = async (formData: SignupData) => {
  try {
    const res = await fetch(`${AUTH_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    if (!res.ok) {
      return { error: "Something went wrong" };
    }
    
    const token = res.headers.get("Authorization");
    if (token) sessionStorage.setItem("token", token);
    
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

const logout = async () => {
}