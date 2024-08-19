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

export const AUTH_BASE_URL = "https://api.ob.hassanchowdhry.live/api/v1/auth"
// export const AUTH_BASE_URL = "http://localhost:8000/api/v1/auth";

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
      return res.json();
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
    
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const verify_otp = async (email:string, otp: number) => {
  if (!email || !otp) return { error: "Invalid data" };
  try {
    const res = await fetch(`${AUTH_BASE_URL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, otp}),
      credentials: "include",
    });

    if (!res.ok) {
      return res.json();
    }
    
    const token = res.headers.get("Authorization");
    if (token) sessionStorage.setItem("token", token);
    
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export const resend_otp = async (email:string) => {
  if (!email) return { error: "Invalid data" };
  try {
    const res = await fetch(`${AUTH_BASE_URL}/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
      credentials: "include",
    });
    
    return res.json();
  } catch (error) {
    console.error(error);
  }
}