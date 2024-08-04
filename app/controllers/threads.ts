export const runStates = ["requires_action", "cancelled", "failed", "completed", "expired"]

const API_SERVER = "http://localhost:8000/v1"

// TODO: Attach tokens to requests + set new token
export const createNewThread = async () => {
  try {
    const res = await fetch(`${API_SERVER}/threads`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token') ?? '' }`
      },
      credentials: "include",
    })

    if (!res.ok) {
      return;
    }

    const new_token = res.headers.get("Authorization");
    if (new_token) sessionStorage.setItem("token", new_token);
  
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export const fetchThread = async (threadId: string) => {
  if (!threadId) {
    throw new Error("threadId is required")
  }
  try {
    const res = await fetch(`${API_SERVER}/threads/${threadId}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token') ?? '' }`
      },
      credentials: "include",
    })
    
    if (!res.ok) {
      return;
    }

    const new_token = res.headers.get("Authorization");
    if (new_token) sessionStorage.setItem("token", new_token);
  
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export const postMessage = async (threadId: string, message: string, gptModel: string) => {
  if (!threadId || !message) {
    throw new Error("threadId and message are required")
  }
  try {
    const res = await fetch(`${API_SERVER}/threads/${threadId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionStorage.getItem('token') ?? '' }`
      },
      body: JSON.stringify({ 
        content: message,
        model: gptModel,
      }),
      credentials: "include",
    })
    if (!res.ok) {
      return;
    }

    const new_token = res.headers.get("Authorization");
    if (new_token) sessionStorage.setItem("token", new_token);
  
    return res.json()
  } catch (error) {
    console.error(error)
  }
}