import React from 'react';
import {computed, observable, reaction, action} from 'mobx';
import {inject, observer} from 'mobx-react';

@observer
class App extends React.Component {
  @observable names: string[] = ['Choco', 'Vanilla', 'Strawberry'];

  @action
  addSomebody = () => {
    this.names
    ? this.names.push(`Somebody${this.names.length}`)
    : this.names = [`Choco`];
  }

  @action
  removeAllNames = () => {
    if (this.names) this.names = null;
  }

  componentDidMount() {
    reaction(
      () => this.names?.length,
      () => {
        console.log(this.names);
      }
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.addSomebody}>Add Somebody</button>
        <button onClick={this.removeAllNames}>Remove All Names</button>
        {this.names?.map(name => {
          return (
            <SayHi key={name} name={name} />
          );
        })}
      </div>
    );
  }
};

interface SayHiProps {
  name: string;
}

const SayHi = (props: SayHiProps) => {
  return (
    <div>Hi, I'm {props.name}!</div>
  );
}

export default App;