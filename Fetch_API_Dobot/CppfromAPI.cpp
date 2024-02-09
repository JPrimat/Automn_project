#include <iostream>
#include <curl/curl.h>
#include <nlohmann/json.hpp>

// https://github.com/nlohmann/json to get Json from C++ interface

// Define a type alias for JSON using nlohmann::json
using json = nlohmann::json;

// Callback function to handle the response from the server
size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* output) {
    size_t totalSize = size * nmemb;
    output->append(static_cast<char*>(contents), totalSize);
    return totalSize;
}

int main() {
    // Initialize cURL
    CURL* curl;
    CURLcode res = curl_global_init(CURL_GLOBAL_DEFAULT);
    if (res != CURLE_OK) {
        std::cerr << "cURL initialization failed: " << curl_easy_strerror(res) << std::endl;
        return 1;
    }

    // Make a GET request to retrieve data
    curl = curl_easy_init();
    if (curl) {
        // Set the URL of the API endpoint
        curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:3000/api/data");

        // Set the callback function to handle the response
        std::string responseData;
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseData);

        // Perform the GET request
        res = curl_easy_perform(curl);

        // Check for errors
        if (res != CURLE_OK) {
            std::cerr << "cURL GET request failed: " << curl_easy_strerror(res) << std::endl;
        } else {
            // Parse the JSON response using nlohmann::json
            json jsonData = json::parse(responseData);

            // Access specific fields in the JSON
            std::cout << "Value of 'key' in JSON response: " << jsonData["key"] << std::endl;

            // You can also iterate through the JSON if it's an array or more complex structure
            for (const auto& item : jsonData["array"]) {
                std::cout << "Element in array: " << item << std::endl;
            }
        }

        // Clean up
        curl_easy_cleanup(curl);
    }

    // Cleanup cURL
    curl_global_cleanup();

    return 0;
}
