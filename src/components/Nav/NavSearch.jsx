import React, { useState, useEffect, useRef } from 'react';
import NavSearchItem from './NavSearchItem';
import { firestore } from '../../services/firebase';
import Styles from '../../styles/nav/nav__search.module.css';

const NavSearch = ({ searchInput, setOpenSearch, setSearchInput, searchRef }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    let handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setOpenSearch(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  useEffect(async () => {
    console.log('tf');
    if (searchInput !== '') {
      let temp = [];
      const userRef = await firestore
        .collection('users')
        .where('username', '>=', searchInput)
        .where('username', '<=', searchInput + '\uf8ff')
        .get()
        .then((results) => {
          return results.forEach((doc) => {
            console.log('ok', doc.data());
            temp.push(doc.data());
          });
        });
      setSearchResults(temp);
    }
  }, [searchInput]);

  useEffect(() => {
    if (searchResults.length === 0) {
      console.log(searchResults.length);
      setNoResults(true);
    } else if (searchResults.length > 0) {
      console.log('huh');
      setNoResults(false);
    }
  }, [searchResults]);

  return (
    <div ref={searchRef} className={Styles.container}>
      <div className={Styles.inner}>
        {noResults && <p className={Styles.noResults}>No Results</p>}
        {searchResults.map((item) => (
          <NavSearchItem
            setSearchInput={setSearchInput}
            setOpenSearch={setOpenSearch}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default NavSearch;
