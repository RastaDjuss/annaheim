--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: anarcrypt
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO anarcrypt;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: anarcrypt
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    user_id integer,
    amount numeric NOT NULL,
    transaction_type character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.transactions OWNER TO anarcrypt;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: anarcrypt
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_id_seq OWNER TO anarcrypt;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: anarcrypt
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: anarcrypt
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password_hash text NOT NULL,
    email character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO anarcrypt;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: anarcrypt
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO anarcrypt;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: anarcrypt
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: anarcrypt
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: anarcrypt
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: anarcrypt
--

COPY public.transactions (id, user_id, amount, transaction_type, created_at) FROM stdin;
1	1	1000.50	deposit	2025-03-13 21:37:01.41741
2	1	-50.75	withdrawal	2025-03-13 21:37:01.41741
3	2	200.00	deposit	2025-03-13 21:37:01.41741
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: anarcrypt
--

COPY public.users (id, username, password_hash, email, created_at) FROM stdin;
1	user1	hashed_password1	user1@example.com	2025-03-13 21:36:53.71217
2	user2	hashed_password2	user2@example.com	2025-03-13 21:36:53.71217
\.


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anarcrypt
--

SELECT pg_catalog.setval('public.transactions_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anarcrypt
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: anarcrypt
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: anarcrypt
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: anarcrypt
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: anarcrypt
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: anarcrypt
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

