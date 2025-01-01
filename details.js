document.addEventListener("DOMContentLoaded", () => {
    const endpoint =
      "https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/cls73m10h0txm01uqonl6385m/master";
    const token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzU1MTA1ODYsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEtc2hhcmVkLXVzZWExLTAyLmh5Z3JhcGguY29tL3YyL2NsczczbTEwaDB0eG0wMXVxb25sNjM4NW0vbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtdXMtZWFzdC0xLXNoYXJlZC11c2VhMS0wMi5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Mjk2YWI1NC02YTdjLTQzYTEtYTY3Mi1iNWVkMjdlNTI2ZjciLCJqdGkiOiJjbTVhNjZ5dmgwd3JyMDdsZzZkNThkZDJwIn0.JhDAC21hQD2u9y5WOPSC9MaG10-mks-fG02t0qqpwieWiDOAjNh9335z9rKPJ9G3Irridk0RClzSCrGD8RqpOLKHcj-q6CTaIg2sprBBvlcwX7fkJ2mv7RHoFQaMtnZbPK8ePOvZ9spkmBn2FcroFfgrKN76b0RwRRQzqDdEyl3-8QAHuveuC3eyxKwSiYfx1PNuWWQdav4aY2fkuJVuAtJrJFAIwcjHuySiTKXWIk52GLltnIn2jVpZmTi0piIEWkfszGBch0KZ1iZuOk996hPzri_hxgje1hYZWLB6yhzJAbc-BT4_GDrWAOz4yrDg_UDdGL6nfvtosdp0w2WECylbZF0v2ggE_1Hn8g4zp35Ymr4X8koqqQEdjov0kjJLO75LHjiSsjmSTCKRpNoAeQ42I06d6WO2PXnj-7LAcZuwcVLDM8Gvg4j93BQLluiMxOAcJiOS7-0SqTN9UB86fs_Eq3mfN1dBM-25eWSpExRd7UK2H0ofu4mr-13vFcVtJcpTIULAZ6LdDDY9a23PYhn1_YxgVNqkxj0aXJUknQ_mVHMHAE7YBQiaCam6O90MSVG9STzUGwJ3St-laEGwVQN4orbp4z0aLMrvf73b4ZL9W5Ho1o2dXjqawsDtMLOwkA3ZiH8wBOKe2gY80rqwwYZ0pBZ-Njcdn_Cv4tKyRiM";
  
    // Extract the slug from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get("id");
  
    if (!slug) {
      document.getElementById("post-details").innerHTML =
        "<p>Error: No post selected.</p>";
      return;
    }
  
    // GraphQL Query to fetch post details by slug
    const query = `
      query {
        post(where: {slug: "${slug}"}) {
          title
          content
          coverPhoto {
            url
          }
        }
      }
    `;
  
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Network response was not ok", response);
          return Promise.reject(response);
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        const post = data.data.post;
  
        if (!post) {
          document.getElementById("post-details").innerHTML =
            "<p>Error: Post not found.</p>";
          return;
        }
  
        const postDetails = `
          <h1>${post.title}</h1>
          ${post.coverPhoto ? `<img src="${post.coverPhoto.url}" alt="${post.title}" style="max-width: 100%; height: auto;" />` : ""}
          <div>${post.content}</div>
        `;
  
        document.getElementById("post-details").innerHTML = postDetails;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        document.getElementById("post-details").innerHTML =
          "<p>Error loading post details.</p>";
      });
  });
  