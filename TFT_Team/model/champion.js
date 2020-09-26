const axios = require('axios')

const player ={
    query: `
    query TftProbuildPlayers {
          probuilds {
                    summoners {
                                name
                                region
                                puuid 
                                accountid
                                profileiconid
                                leagues
                                summonerlevel
                            }
                         }
                        }`
};
const dataQuery = {
  query: `
          query TftProbuildMatches($offset: Int!) {
                  probuilds {
                            matches(offset: $offset) {
                              matchid
                              createdAt
                              players
                              data
                              length
                              queueId
                              patch
                                   }
                       }
                     }`,
  variables: {offset: 0}
}
const championData = axios({
    method: 'post',
    url: 'https://tft.iesdev.com/graphql',
    data:player
  });

 
module.exports={
    championData
}