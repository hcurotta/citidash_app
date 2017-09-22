const rootAPIEndpoint = "https://api.dockdash.racing/"

const apiEndpoints = {  
  login: 'login', 
  refreshData: 'profile/refresh_data', 
  profile: 'profile',
  tripLeaderboard: 'stats?order_by=trip_count', 
  distanceLeaderboard: 'stats?order_by=total_distance', 
  durationLeaderboard: 'stats?order_by=total_duration', 
}

export const ApiUtils = {  
  checkStatus: function(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      console.log('error');
      error.response = response;
      throw error;
    }
  },

  getAuthHeaders: function(authToken) {
    return { Authorization: `Bearer ${authToken}`}
  },

  getPostHeaders: function() {
    return{
      Accept: "application/json, application/xml, text/plain, text/html, *.*",
      "Content-Type": "application/x-www-form-urlencoded",
    }
  },
  
  getApiEndpoint: function(endpoint) {
    return (rootAPIEndpoint + apiEndpoints[endpoint]);
  }
};
