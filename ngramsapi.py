
import requests 
import urllib 

default_params = {
    'year_start': 1674,
    'year_end': 1912,
    'corpus': 26,
    'smoothing': 3,
    'case_insensitive': False,
}
def runQuery(query, start_year=default_params['year_start'],  
             end_year=default_params['year_end'], corpus=default_params['corpus'], 
             smoothing=default_params['smoothing'], case_insensitive=default_params['case_insensitive']): 
    query = urllib.parse.quote(query) 
    
    
    url = f'https://books.google.com/ngrams/json?content={query}' \
      f'&year_start={start_year}' \
      f'&year_end={end_year}' \
      f'&corpus={corpus}' \
      f'&smoothing={smoothing}' \
      f'&case_insensitive={case_insensitive}' if case_insensitive else "" \

    response = requests.get(url) 
    output = response.json() 
    return_data = [] 
  
    if len(output) == 0: 
        return "No data available for this Ngram."

    for num in range(len(output)): 
        return_data.append((output[num]['ngram'], output[num]['timeseries'])) 
  
    return return_data 


query = 'old *'
british_corpus = "en-GB-2019"
start, end = 1850, 1900
result = runQuery(query, start_year=start, end_year=end, corpus=british_corpus, case_insensitive=True)

with open('/Users/hassanchowdhry/Desktop/Workspace/Projects/OldBailey-AI/result.txt', 'a') as file:
  file.write(str(result) + '\n')