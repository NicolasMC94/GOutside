const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      /* 			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			] */
      tokenLS: null,
      userRol: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      /* exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			} */
      signupCompetitor: async (email, password1, password2) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/singup", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password1: password1,
              password2: password2,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await resp.json();
          if (resp.status === 200) {
            localStorage.setItem("token", data.token);
            setStore({ tokenLS: data.token, userRol: data.rol });
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      login: async (email, password) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await resp.json();
          if (resp.status === 200) {
            localStorage.setItem("token", data.token);
            setStore({ tokenLS: data.token, userRol: data.rol });
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
    },
  };
};

export default getState;
