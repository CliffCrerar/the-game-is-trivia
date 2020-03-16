import Head from 'next/head'
import { Component } from 'react'
import thisPoes from '../public/db/index';
console.log('thisPoes: ', thisPoes);

// HeroesDB().checkAdapter('idb').then(db=>console.log(db))

class Home extends Component {

  constructor() {
    super()
    // this.db;
    // this.db = RxDB
    // console.log('RxDB: ', this.db);

    this.state = {
      hidden: true,
      classes: {
        flexColumn: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center'
        },
        main: { flex: '1' }
      }
    }
    this.user = 'anonymous user';
  }

  login(ev) {

    console.log('ev: ', ev);
    this.setState({ hidden: false });
  }

  render() {
    return (
      <div className="container">

        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main style={this.state.classes.flexColumn}>
          <style jsx global>{`
            body, main{
              height: 100vh;
              margin: 0;
              width: 100vw;
            }
            main{
              width: 500px;
              margin: auto;
            }
            .app-box{
              width: 100%;
              padding: 20px;
              border: 1px solid;
              margin: 20px;
            }
          `}

          </style>

          <div className="app-box">
            <h2>Chatsworth</h2>
            <form hidden={!this.state.hidden}>
              <label htmlFor="#namInp">Login</label>
              <input id="namInp" name="name" placeholder="enter name" />
              <button type="button" onClick={(ev) => this.login(ev)}>Login</button>
            </form>
          </div>

          <div style={this.state.classes.main} className="app-box" hidden={this.state.hidden}>

            <div>Demo Chatter</div>

          </div>

        </main>

      </div>
    )
  }
}

export default Home
