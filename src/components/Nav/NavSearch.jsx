import React, { useState, useEffect } from 'react';
import NavSearchItem from './NavSearchItem';
import { firestore } from '../../services/firebase';
import Styles from '../../styles/nav/nav__search.module.css';

const NavSearch = ({ searchInput, setOpenSearch, setSearchInput, searchRef }) => {
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const search = async () => {
      if (searchInput !== '') {
        setLoading(true);
        let temp = [];
        await firestore
          .collection('users')
          .where('searchName', '>=', searchInput.toLowerCase())
          .where('searchName', '<=', searchInput.toLowerCase() + '\uf8ff')
          .limit(5)
          .get()
          .then((results) => {
            return results.forEach((doc) => {
              temp.push(doc.data());
            });
          });
        setSearchResults(temp);
        setLoading(false);
      }
    };
    search();
  }, [searchInput]);

  let searchInner;

  if (loading) {
    searchInner = <div className={`loader ${Styles.loader}`} />;
  }

  if (!loading) {
    searchInner = (
      <>
        {searchResults.length === 0 && <p className={Styles.noResults}>No Results</p>}
        {searchResults.map((item) => (
          <NavSearchItem
            key={item.username}
            setSearchInput={setSearchInput}
            setOpenSearch={setOpenSearch}
            item={item}
          />
        ))}
      </>
    );
  }

  return (
    <div ref={searchRef} className={Styles.container}>
      <div className={Styles.inner}>{searchInner}</div>
    </div>
  );
};

export default NavSearch;
