from os import path
import requests 
import urllib 
import pandas as pd
import matplotlib.pyplot as plt

default_params = {
    'year_start': 1674,
    'year_end': 1912,
    'corpus': 26,
    'smoothing': 3,
    'case_insensitive': False,
}
def get_word_trends(query, **kwargs): 
    params = default_params.copy()  # Copy the default parameters
    params.update(kwargs)  # Update with any provided parameters
    
    print(params)
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
    
    print(url)

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
    
    df.to_csv(path.join(path.dirname(__file__), 'ngrams_statistics.csv'), index=False)
    return df
  
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

# query = 'old bailey'
# start, end = 1850, 1860
# df = get_word_trends(query, start_year=start, end_year=end)

# with open(path.join(path.dirname(__file__), 'result.txt'), 'a') as file:
# #   file.write(str(data) + '\n')
#   file.write(str(df) + '\n')
  
# # Plot the DataFrame
# plot_ngrams(df)