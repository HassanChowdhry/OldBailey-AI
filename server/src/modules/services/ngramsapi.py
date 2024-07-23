import requests 
import urllib 
import pandas as pd
import matplotlib.pyplot as plt

default_params = {
    'year_start': 1674,
    'year_end': 1912,
    'corpus': "en-GB-2019",
    'smoothing': 3,
    'case_insensitive': False,
}
def get_word_trends(query, **kwargs): 
    params = default_params.copy()  # Copy the default parameters
    params.update(kwargs)  # Update with any provided parameters

    # Extract individual parameters
    year_start = params['year_start']
    year_end = params['year_end']
    corpus = params['corpus']
    smoothing = params['smoothing']
    case_insensitive = params['case_insensitive']
    query = urllib.parse.quote(query) 

    url = f'https://books.google.com/ngrams/json?content={query}' \
      f'&year_start={year_start}' \
      f'&year_end={year_end}' \
      f'&corpus={corpus}' \
      f'&smoothing={smoothing}' \
      f'{f'&case_insensitive={case_insensitive}' if case_insensitive else ""}'

    response = requests.get(url) 
    output = response.json() 
    return_data = [] 
    years = list(range(year_start, year_end + 1))
    df = pd.DataFrame({'year': years})
  
    if len(output) == 0: 
        return "No data available for this Ngram."
    for num in range(len(output)): 
        ngram = output[num]['ngram']
        timeseries = output[num]['timeseries']
        df[ngram] = timeseries
        return_data.append((ngram, timeseries))

    return df.to_json()
  
def plot_ngrams(df):
    plt.figure(figsize=(10, 6))
    for column in df.columns[1:]:
        plt.plot(df['year'], df[column], label=column)
    
    plt.xlabel('Year')
    plt.ylabel('Frequency')
    plt.title('Ngram Frequencies Over Time')
    plt.legend()
    plt.grid(True)
    plt.show()