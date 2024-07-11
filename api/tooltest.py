

tools_list = [{
  "type": "function",
  "function": {
    "name": "get_word_trends",
    "description": "Get the trends of a word over time using the google ngrams api",
    "parameters": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "description": "The word to get the trends for"
        },
        "start_year": {
          "type": "integer",
          "description": "The start year for the trends"
        },
        "end_year": {
          "type": "integer",
          "description": "The end year for the trends"
        },
        "corpus": {
          "type": "string",
          "description": "The corpus to use for the trends"
        },
        "smoothing": {
          "type": "integer",
          "description": "The smoothing factor for the trends"
        },
        "case_insensitive": {
          "type": "boolean",
          "description": "Flag to indicate if the search should be case insensitive"
        },
      },
      "required": ["query"]
    }
    
  }
}]