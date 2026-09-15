import { useEffect, useState } from 'react';
import { api } from '../api';

export function useProjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    api
      .listProjects()
      .then((d) => {
        if (cancelled) return;
        setData(d);
        setError('');
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = () => {
    setLoading(true);
    setError('');
    setAttempt((a) => a + 1);
  };

  return { data, loading, error, retry };
}

export function useProject(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    api
      .getProject(slug)
      .then((d) => {
        if (cancelled) return;
        setData(d);
        setError('');
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, attempt]);

  const retry = () => {
    setLoading(true);
    setError('');
    setAttempt((a) => a + 1);
  };

  return { data, loading, error, retry };
}

export function useAbout() {
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    Promise.all([api.getAbout(), api.listSkills()])
      .then(([a, s]) => {
        if (cancelled) return;
        setAbout(a);
        setSkills(s);
        setError('');
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = () => {
    setLoading(true);
    setError('');
    setAttempt((a) => a + 1);
  };

  return { about, skills, loading, error, retry };
}
