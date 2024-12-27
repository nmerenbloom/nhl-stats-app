import sys
import json
import urllib.request
import pandas as pd

contents = urllib.request.urlopen("https://www.rotowire.com/hockey/tables/stats.php?pos=skater&season=2023").read()


json_obj = json.loads(contents)

df = pd.DataFrame(json_obj)
df = df.filter(items=['player', 'team', 'position', 'gp', 'goals', 'assists', 'points', 'plusMinus', 'pim', 'shots', 'gwg', 'ppGoals', 'ppAssists', 'shortHandedGoals', 'shortHandedAssists', 'hits', 'blocks' ])

df.columns= ['Player Name', 'Team', 'Pos', 'Games', 'G', 'A', 'Pts', '+/-', 'PIM', 'SOG', 'GWG', 'PPG', 'PPA', 'SHG', 'SHA', 'Hits', 'Blocks' ]
df[['Games', 'G', 'A', 'Pts', 'SOG', 'GWG','Hits', 'Blocks', 'PPG', 'PPA']] = df[['Games', 'G', 'A', 'Pts', 'SOG', 'GWG','Hits', 'Blocks', 'PPG', 'PPA']].apply(pd.to_numeric)
df['PPP'] = df['PPA'] + df['PPG']

df = df.filter(['Player Name', 'Team', 'Pos', 'Games', 'G', 'A', 'Pts',  'PPP', 'SOG', 'GWG','Hits', 'Blocks' ])

def trimTeam(href):
  output = ""
  for char in href:
    if char.isupper():
      output += char
  return output

df['Team'] = df['Team'].apply(trimTeam)




p = df
p['x̄Hits'] = p['Hits'] / p['Games']
p['x̄Blocks'] = p['Blocks'] / p['Games']
p['x̄SOG'] = p['SOG'] / p['Games']


#Uncomment Below for sorting based on totals
# p = df.sort_values(by=['Hits', 'Blocks', 'SOG'], ascending=False)
# p = p[p['Blocks'] > 10]
# p = p[p['Hits'] > 10]


# strongScheduleTeams = ['CLS', 'DAL', 'FLA', 'MIN', 'MON', 'SJ', 'TB', 'TOR', 'VAN']

#Uncomment Below for sorting based on Averages
p = p.sort_values(by=['x̄Hits', 'x̄SOG'], ascending=False)
p = p[p['x̄Blocks'] > 1.75]
p = p[p['x̄Hits'] > 1.75]
p = p[p['x̄SOG'] > 1.5]
p = p[p['Hits'] > 10]

# p['special'] = p['x̄Hits'] + p['x̄Blocks'] + p['x̄SOG']
# p = p.sort_values(by=['special'], ascending=False)

# p = p[p['Team'].isin(strongScheduleTeams)]



p = p[0:50]





out = p.to_json(orient='records')





# json_obj = json.loads(contents)
json_obj = json.dumps(out)

sys.stdout.write(json_obj)