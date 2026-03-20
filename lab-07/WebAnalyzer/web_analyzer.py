import requests
from bs4 import BeautifulSoup 
import re
from collections import Counter


url = "https://en.wikipedia.org/wiki/University_of_Calgary"
headers = { "User-Agent": "lab07-web-analyzer" } 

try: 
    response = requests.get(url, headers=headers)
    response.raise_for_status() # Ensures the request was successful
    soup = BeautifulSoup(response.text, 'html.parser')
    print(f"Successfully fetched content from {url}")
except Exception as e:
    print(f"Error fetching content: {e}")

print(soup.prettify()) 


# Count headings (h1 to h6)
headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
heading_count = len(headings)

# Count links
links = soup.find_all('a')
link_count = len(links)

# Count paragraphs
paragraphs = soup.find_all('p')
paragraph_count = len(paragraphs)

# Display results
print(f"\nData Analysis Results:")
print(f"Total No. of headings: {heading_count}")
print(f"Total No. of links: {link_count}")
print(f"Total No. of paragraphs: {paragraph_count}")

#Extract all text content 
text_content = soup.get_text();
words = re.findall(r'\b\w+\b', text_content.lower())

#split text into words 
word_count = len(words)

#count the frequency of each word
word_freq = {}
for word in words:
    if word in word_freq:
        word_freq[word] += 1
    else:
        word_freq[word] = 1


# Display top 5 most common words
top_5_words = Counter(words).most_common(5)
print("\nTop 5 most frequent words:")
for word, freq in top_5_words:
    print(f"{word}: {freq}")    


