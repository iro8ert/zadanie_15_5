const GIPHY_API_URL = 'https://api.giphy.com';
const GIPHY_PUB_KEY = 'jH8VuwSrEU1ecf1PAZljO5T13Qh5YKFg';

App = React.createClass({
        getInitialState() {
            return {
                loading: false,
                searchingText: '',
                gif: {}
            };
        },

    getGif: function(searchingText) {
        return new Promise(function (resolve, reject) {
        const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText; 
        const xhr = new XMLHttpRequest();                         
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText).data;   
                const gif = {                                     
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                
                resolve(gif)                                  
            
            } else {
                reject(new Error(this.statusText))
            };
        }
        xhr.send()
        })
    },

    handleSearch: function(searchingText) {                     
        this.setState({
            loading: true,
            searchingText: searchingText
        });
        this.getGif(searchingText).then(function(gif) {              
            this.setState({                                     
                loading: false,                                 
                gif: gif,                                       
                searchingText: searchingText                    
            });
        }.bind(this));
    },

    render: function() {
        const styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
            <h1>Wyszukiwarka GIFow!</h1>
            <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
            <Search onSearch={this.handleSearch}/>
           
            <Gif
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />
            
          </div>
        );
    }
});