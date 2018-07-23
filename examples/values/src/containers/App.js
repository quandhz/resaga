import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CONFIG } from './config';
import resaga from '../../../../build';

const COMPLETED = 'completed';
const OUTSTANDING = 'outstanding';

const nodeStore = {
  nodes: {
    1: {
      content: 'Lost in Japan',
      checklists: [11, 12, 13],
    },

    11: { checklists: [111, 112] },
    12: { content: 'Lost in Mexico', checklists: [121, 122, 123] },
    13: { checklists: [131, 132, 133, 134] },

    111: { status: COMPLETED },
    112: { status: OUTSTANDING },
    121: { status: COMPLETED },
    122: { status: OUTSTANDING },
    123: { status: COMPLETED },
    131: { status: OUTSTANDING },
    132: { status: COMPLETED },
    133: { status: OUTSTANDING },
    134: { content: 'Lost in Shanghai', status: OUTSTANDING },
  },
};


export class App extends PureComponent {
  componentDidMount = () => {
    this.props.resaga.setValue(nodeStore);
  };

  changeContent = () => this.props.resaga.setValue({ content: (content) => `${content} *` });
  resetContent = () => this.props.resaga.setValue({ content: nodeStore.nodes[1].content });

  addChecklists = () => this.props.resaga.setValue({ checklists: (checklists = []) => checklists.concat(checklists.length) });
  resetChecklists = () => this.props.resaga.setValue({ checklists: [121, 122, 123] });

  renderMatches = (condition) => {
    const renderTrue = <span style={{ color: 'green' }}>true</span>;
    const renderFalse = <span style={{ color: 'red' }}>false</span>;

    return condition ? renderTrue : renderFalse;
  };

  renderTable = () => {
    const {
      node1Content,
      nodeIdContent,
      node1Checklists,
      nodeIdChecklists,
      idsChecklists,
      nodeIdContentGetter,
      nodeIdChildIdChecklists,
      idsChecklistsExtras,
      nodeIdChecklistsCount,
      nodeIdChildIdCount,
      idsCount,
    } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <td>Value</td>
            <td>Expected</td>
            <td>Actual</td>
            <td>Matches</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Node 1 content</td>
            <td>Lost in Japan</td>
            <td>{node1Content}</td>
            <td>{this.renderMatches(node1Content === 'Lost in Japan')}</td>
          </tr>
          <tr>
            <td>Node :id content</td>
            <td>Lost in Mexico</td>
            <td>{nodeIdContent}</td>
            <td>{this.renderMatches(nodeIdContent === 'Lost in Mexico')}</td>
          </tr>
          <tr>
            <td>Node :id content with getter</td>
            <td>Content: Lost in Mexico</td>
            <td>{nodeIdContentGetter}</td>
            <td>{this.renderMatches(nodeIdContentGetter === 'Content: Lost in Mexico')}</td>
          </tr>
          <tr>
            <td>Node 1 checklists</td>
            <td>{[11, 12, 13].toString()}</td>
            <td>{node1Checklists.toString()}</td>
            <td>{this.renderMatches(node1Checklists.toString() === [11, 12, 13].toString())}</td>
          </tr>
          <tr>
            <td>Node :id checklists</td>
            <td>{[121, 122, 123].toString()}</td>
            <td>{nodeIdChecklists.toString()}</td>
            <td>{this.renderMatches(nodeIdChecklists.toString() === [121, 122, 123].toString())}</td>
          </tr>
          <tr>
            <td>Node :id and :childId checklists</td>
            <td>{[121, 122, 123, 111, 112].toString()}</td>
            <td>{nodeIdChildIdChecklists.toString()}</td>
            <td>{this.renderMatches(nodeIdChildIdChecklists.toString() === [121, 122, 123, 111, 112].toString())}</td>
          </tr>
          <tr>
            <td>Node :ids checklists</td>
            <td>{[111, 112, 121, 122, 123, 131, 132, 133, 134].toString()}</td>
            <td>{idsChecklists.toString()}</td>
            <td>{this.renderMatches(idsChecklists.toString() === [111, 112, 121, 122, 123, 131, 132, 133, 134].toString())}</td>
          </tr>
          <tr>
            <td>Node :ids checklists + extras1 + extras2</td>
            <td>{[111, 112, 121, 122, 123, 131, 132, 133, 134, 99, 100].toString()}</td>
            <td>{idsChecklistsExtras.toString()}</td>
            <td>{this.renderMatches(idsChecklistsExtras.toString() === [111, 112, 121, 122, 123, 131, 132, 133, 134, 99, 100].toString())}</td>
          </tr>
          <tr>
            <td>Node :id checklist count</td>
            <td>{3}</td>
            <td>{nodeIdChecklistsCount}</td>
            <td>{this.renderMatches(nodeIdChecklistsCount === 3)}</td>
          </tr>
          <tr>
            <td>Node :id and :childId count</td>
            <td>{5}</td>
            <td>{nodeIdChildIdCount}</td>
            <td>{this.renderMatches(nodeIdChildIdCount === 5)}</td>
          </tr>
          <tr>
            <td>Node :ids checklists count</td>
            <td>{9}</td>
            <td>{idsCount}</td>
            <td>{this.renderMatches(idsCount === 9)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  renderControl = () => {
    const { content } = this.props;

    return (
      <div>
        Content: {content}
        <div>
          <button onClick={this.changeContent}>
            Change Content
          </button>&nbsp;&nbsp;&nbsp;

          <button onClick={this.resetContent}>
            Reset
          </button>
        </div>
      </div>
    );
  };

  renderChecklistControl = () => {
    const { checklists } = this.props;

    return (
      <div>
        Content: {checklists.toString()}
        <div>
          <button onClick={this.addChecklists}>
            Add checklist
          </button>&nbsp;&nbsp;&nbsp;

          <button onClick={this.resetChecklists}>
            Reset
          </button>
        </div>
      </div>
    );
  }

  render = () => (
    <div>
      <h2>Values subscription tests</h2>
      <div>
        {this.renderChecklistControl()}
      </div>
      <hr />
      <div>
        {this.renderControl()}
      </div>
      <hr />
      <div>
        {this.renderTable()}
      </div>
    </div>
  )
}

App.propTypes = {
  resaga: PropTypes.object.isRequired,

  // resaga props
  content: PropTypes.string,
  node1Content: PropTypes.string,
  nodeIdContent: PropTypes.string,
  nodeIdContentGetter: PropTypes.string,
  checklists: PropTypes.array,
  node1Checklists: PropTypes.array,
  nodeIdChecklists: PropTypes.array,
  nodeIdChildIdChecklists: PropTypes.array,
  idsChecklists: PropTypes.array,
  idsChecklistsExtras: PropTypes.array,
  nodeIdChecklistsCount: PropTypes.number,
  nodeIdChildIdCount: PropTypes.number,
  idsCount: PropTypes.number,
};

App.defaultProps = {
  content: '',
  node1Content: '',
  nodeIdContent: '',
  nodeIdContentGetter: '',
  checklists: [],
  node1Checklists: [],
  nodeIdChecklists: [],
  nodeIdChildIdChecklists: [],
  idsChecklists: [],
  idsChecklistsExtras: [],
  nodeIdChecklistsCount: 0,
  nodeIdChildIdCount: 0,
  idsCount: 0,
};

export default resaga(App, CONFIG);
