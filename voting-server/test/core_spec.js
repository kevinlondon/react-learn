import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

const initialMovies = List.of('Trainspotting', '28 Days Later');
const finalMovies = List.of('Trainspotting', '28 Days Later', 'Sunshine');


describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = initialMovies;
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: initialMovies
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = initialMovies;
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: initialMovies
      }));
    });

  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: finalMovies
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: initialMovies
        }),
        entries: List.of('Sunshine')
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: initialMovies,
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting')
      }));
    });

    it('puts them both from tied vote back into entries', () => {
      const state = Map({
        vote: Map({
          pair: initialMovies,
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 3
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      expect(next(state)).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
      }));
    });
  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: initialMovies,
        }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: initialMovies,
          tally: Map({
            'Trainspotting': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        entries: List(),
        vote: Map({
          pair: initialMovies,
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 2
          })
        })
      });

      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: initialMovies,
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List()
      }));
    });

  });

});
