PGDMP  0    
                }            ecomv1    17.4    17.4 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    30640    ecomv1    DATABASE     �   CREATE DATABASE ecomv1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE ecomv1;
                     postgres    false            �            1259    30641    Contacts    TABLE        CREATE TABLE public."Contacts" (
    id integer NOT NULL,
    date_created timestamp with time zone,
    "firstName" character varying(255),
    "lastName" character varying(255),
    email character varying(255),
    subject character varying(255),
    message character varying(255)
);
    DROP TABLE public."Contacts";
       public         heap r       postgres    false            �            1259    30646    Contacts_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Contacts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Contacts_id_seq";
       public               postgres    false    217            �           0    0    Contacts_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Contacts_id_seq" OWNED BY public."Contacts".id;
          public               postgres    false    218            �            1259    30647    Other_Images    TABLE     �   CREATE TABLE public."Other_Images" (
    id integer NOT NULL,
    user_created uuid,
    date_created timestamp with time zone,
    banner1_image uuid,
    banner2_image uuid,
    about_us_image uuid
);
 "   DROP TABLE public."Other_Images";
       public         heap r       postgres    false            �            1259    30650    Other_Images_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Other_Images_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Other_Images_id_seq";
       public               postgres    false    219            �           0    0    Other_Images_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Other_Images_id_seq" OWNED BY public."Other_Images".id;
          public               postgres    false    220            �            1259    30651    cart    TABLE     ~   CREATE TABLE public.cart (
    id uuid NOT NULL,
    date_created timestamp with time zone,
    "totalPrice" numeric(10,5)
);
    DROP TABLE public.cart;
       public         heap r       postgres    false            �            1259    30654 
   cart_items    TABLE     �   CREATE TABLE public.cart_items (
    id integer NOT NULL,
    date_created timestamp with time zone,
    quantity integer,
    price real,
    product integer,
    cart uuid NOT NULL
);
    DROP TABLE public.cart_items;
       public         heap r       postgres    false            �            1259    30657    cart_items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.cart_items_id_seq;
       public               postgres    false    222            �           0    0    cart_items_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;
          public               postgres    false    223            �            1259    30658    directus_access    TABLE     �   CREATE TABLE public.directus_access (
    id uuid NOT NULL,
    role uuid,
    "user" uuid,
    policy uuid NOT NULL,
    sort integer
);
 #   DROP TABLE public.directus_access;
       public         heap r       postgres    false            �            1259    30661    directus_activity    TABLE     {  CREATE TABLE public.directus_activity (
    id integer NOT NULL,
    action character varying(45) NOT NULL,
    "user" uuid,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ip character varying(50),
    user_agent text,
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    origin character varying(255)
);
 %   DROP TABLE public.directus_activity;
       public         heap r       postgres    false            �            1259    30667    directus_activity_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.directus_activity_id_seq;
       public               postgres    false    225            �           0    0    directus_activity_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.directus_activity_id_seq OWNED BY public.directus_activity.id;
          public               postgres    false    226            �            1259    30668    directus_collections    TABLE     o  CREATE TABLE public.directus_collections (
    collection character varying(64) NOT NULL,
    icon character varying(64),
    note text,
    display_template character varying(255),
    hidden boolean DEFAULT false NOT NULL,
    singleton boolean DEFAULT false NOT NULL,
    translations json,
    archive_field character varying(64),
    archive_app_filter boolean DEFAULT true NOT NULL,
    archive_value character varying(255),
    unarchive_value character varying(255),
    sort_field character varying(64),
    accountability character varying(255) DEFAULT 'all'::character varying,
    color character varying(255),
    item_duplication_fields json,
    sort integer,
    "group" character varying(64),
    collapse character varying(255) DEFAULT 'open'::character varying NOT NULL,
    preview_url character varying(255),
    versioning boolean DEFAULT false NOT NULL
);
 (   DROP TABLE public.directus_collections;
       public         heap r       postgres    false            �            1259    30679    directus_comments    TABLE     l  CREATE TABLE public.directus_comments (
    id uuid NOT NULL,
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    comment text NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    user_updated uuid
);
 %   DROP TABLE public.directus_comments;
       public         heap r       postgres    false            �            1259    30686    directus_dashboards    TABLE     I  CREATE TABLE public.directus_dashboards (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(64) DEFAULT 'dashboard'::character varying NOT NULL,
    note text,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    color character varying(255)
);
 '   DROP TABLE public.directus_dashboards;
       public         heap r       postgres    false            �            1259    30693    directus_extensions    TABLE     �   CREATE TABLE public.directus_extensions (
    enabled boolean DEFAULT true NOT NULL,
    id uuid NOT NULL,
    folder character varying(255) NOT NULL,
    source character varying(255) NOT NULL,
    bundle uuid
);
 '   DROP TABLE public.directus_extensions;
       public         heap r       postgres    false            �            1259    30699    directus_fields    TABLE     �  CREATE TABLE public.directus_fields (
    id integer NOT NULL,
    collection character varying(64) NOT NULL,
    field character varying(64) NOT NULL,
    special character varying(64),
    interface character varying(64),
    options json,
    display character varying(64),
    display_options json,
    readonly boolean DEFAULT false NOT NULL,
    hidden boolean DEFAULT false NOT NULL,
    sort integer,
    width character varying(30) DEFAULT 'full'::character varying,
    translations json,
    note text,
    conditions json,
    required boolean DEFAULT false,
    "group" character varying(64),
    validation json,
    validation_message text
);
 #   DROP TABLE public.directus_fields;
       public         heap r       postgres    false            �            1259    30708    directus_fields_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_fields_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.directus_fields_id_seq;
       public               postgres    false    231            �           0    0    directus_fields_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.directus_fields_id_seq OWNED BY public.directus_fields.id;
          public               postgres    false    232            �            1259    30709    directus_files    TABLE     [  CREATE TABLE public.directus_files (
    id uuid NOT NULL,
    storage character varying(255) NOT NULL,
    filename_disk character varying(255),
    filename_download character varying(255) NOT NULL,
    title character varying(255),
    type character varying(255),
    folder uuid,
    uploaded_by uuid,
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by uuid,
    modified_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    charset character varying(50),
    filesize bigint,
    width integer,
    height integer,
    duration integer,
    embed character varying(200),
    description text,
    location text,
    tags text,
    metadata json,
    focal_point_x integer,
    focal_point_y integer,
    tus_id character varying(64),
    tus_data json,
    uploaded_on timestamp with time zone
);
 "   DROP TABLE public.directus_files;
       public         heap r       postgres    false            �            1259    30716    directus_flows    TABLE       CREATE TABLE public.directus_flows (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(64),
    color character varying(255),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    trigger character varying(255),
    accountability character varying(255) DEFAULT 'all'::character varying,
    options json,
    operation uuid,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);
 "   DROP TABLE public.directus_flows;
       public         heap r       postgres    false            �            1259    30724    directus_folders    TABLE     z   CREATE TABLE public.directus_folders (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    parent uuid
);
 $   DROP TABLE public.directus_folders;
       public         heap r       postgres    false            �            1259    30727    directus_migrations    TABLE     �   CREATE TABLE public.directus_migrations (
    version character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
 '   DROP TABLE public.directus_migrations;
       public         heap r       postgres    false            �            1259    30733    directus_notifications    TABLE     �  CREATE TABLE public.directus_notifications (
    id integer NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(255) DEFAULT 'inbox'::character varying,
    recipient uuid NOT NULL,
    sender uuid,
    subject character varying(255) NOT NULL,
    message text,
    collection character varying(64),
    item character varying(255)
);
 *   DROP TABLE public.directus_notifications;
       public         heap r       postgres    false            �            1259    30740    directus_notifications_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.directus_notifications_id_seq;
       public               postgres    false    237            �           0    0    directus_notifications_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.directus_notifications_id_seq OWNED BY public.directus_notifications.id;
          public               postgres    false    238            �            1259    30741    directus_operations    TABLE     �  CREATE TABLE public.directus_operations (
    id uuid NOT NULL,
    name character varying(255),
    key character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    position_x integer NOT NULL,
    position_y integer NOT NULL,
    options json,
    resolve uuid,
    reject uuid,
    flow uuid NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);
 '   DROP TABLE public.directus_operations;
       public         heap r       postgres    false            �            1259    30747    directus_panels    TABLE     /  CREATE TABLE public.directus_panels (
    id uuid NOT NULL,
    dashboard uuid NOT NULL,
    name character varying(255),
    icon character varying(64) DEFAULT NULL::character varying,
    color character varying(10),
    show_header boolean DEFAULT false NOT NULL,
    note text,
    type character varying(255) NOT NULL,
    position_x integer NOT NULL,
    position_y integer NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    options json,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);
 #   DROP TABLE public.directus_panels;
       public         heap r       postgres    false            �            1259    30755    directus_permissions    TABLE       CREATE TABLE public.directus_permissions (
    id integer NOT NULL,
    collection character varying(64) NOT NULL,
    action character varying(10) NOT NULL,
    permissions json,
    validation json,
    presets json,
    fields text,
    policy uuid NOT NULL
);
 (   DROP TABLE public.directus_permissions;
       public         heap r       postgres    false            �            1259    30760    directus_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.directus_permissions_id_seq;
       public               postgres    false    241            �           0    0    directus_permissions_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.directus_permissions_id_seq OWNED BY public.directus_permissions.id;
          public               postgres    false    242            �            1259    30761    directus_policies    TABLE     p  CREATE TABLE public.directus_policies (
    id uuid NOT NULL,
    name character varying(100) NOT NULL,
    icon character varying(64) DEFAULT 'badge'::character varying NOT NULL,
    description text,
    ip_access text,
    enforce_tfa boolean DEFAULT false NOT NULL,
    admin_access boolean DEFAULT false NOT NULL,
    app_access boolean DEFAULT false NOT NULL
);
 %   DROP TABLE public.directus_policies;
       public         heap r       postgres    false            �            1259    30770    directus_presets    TABLE     �  CREATE TABLE public.directus_presets (
    id integer NOT NULL,
    bookmark character varying(255),
    "user" uuid,
    role uuid,
    collection character varying(64),
    search character varying(100),
    layout character varying(100) DEFAULT 'tabular'::character varying,
    layout_query json,
    layout_options json,
    refresh_interval integer,
    filter json,
    icon character varying(64) DEFAULT 'bookmark'::character varying,
    color character varying(255)
);
 $   DROP TABLE public.directus_presets;
       public         heap r       postgres    false            �            1259    30777    directus_presets_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_presets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.directus_presets_id_seq;
       public               postgres    false    244            �           0    0    directus_presets_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.directus_presets_id_seq OWNED BY public.directus_presets.id;
          public               postgres    false    245            �            1259    30778    directus_relations    TABLE     �  CREATE TABLE public.directus_relations (
    id integer NOT NULL,
    many_collection character varying(64) NOT NULL,
    many_field character varying(64) NOT NULL,
    one_collection character varying(64),
    one_field character varying(64),
    one_collection_field character varying(64),
    one_allowed_collections text,
    junction_field character varying(64),
    sort_field character varying(64),
    one_deselect_action character varying(255) DEFAULT 'nullify'::character varying NOT NULL
);
 &   DROP TABLE public.directus_relations;
       public         heap r       postgres    false            �            1259    30784    directus_relations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_relations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.directus_relations_id_seq;
       public               postgres    false    246            �           0    0    directus_relations_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.directus_relations_id_seq OWNED BY public.directus_relations.id;
          public               postgres    false    247            �            1259    30785    directus_revisions    TABLE       CREATE TABLE public.directus_revisions (
    id integer NOT NULL,
    activity integer NOT NULL,
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    data json,
    delta json,
    parent integer,
    version uuid
);
 &   DROP TABLE public.directus_revisions;
       public         heap r       postgres    false            �            1259    30790    directus_revisions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_revisions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.directus_revisions_id_seq;
       public               postgres    false    248            �           0    0    directus_revisions_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.directus_revisions_id_seq OWNED BY public.directus_revisions.id;
          public               postgres    false    249            �            1259    30791    directus_roles    TABLE     �   CREATE TABLE public.directus_roles (
    id uuid NOT NULL,
    name character varying(100) NOT NULL,
    icon character varying(64) DEFAULT 'supervised_user_circle'::character varying NOT NULL,
    description text,
    parent uuid
);
 "   DROP TABLE public.directus_roles;
       public         heap r       postgres    false            �            1259    30797    directus_sessions    TABLE     !  CREATE TABLE public.directus_sessions (
    token character varying(64) NOT NULL,
    "user" uuid,
    expires timestamp with time zone NOT NULL,
    ip character varying(255),
    user_agent text,
    share uuid,
    origin character varying(255),
    next_token character varying(64)
);
 %   DROP TABLE public.directus_sessions;
       public         heap r       postgres    false            �            1259    30802    directus_settings    TABLE     �  CREATE TABLE public.directus_settings (
    id integer NOT NULL,
    project_name character varying(100) DEFAULT 'Directus'::character varying NOT NULL,
    project_url character varying(255),
    project_color character varying(255) DEFAULT '#6644FF'::character varying NOT NULL,
    project_logo uuid,
    public_foreground uuid,
    public_background uuid,
    public_note text,
    auth_login_attempts integer DEFAULT 25,
    auth_password_policy character varying(100),
    storage_asset_transform character varying(7) DEFAULT 'all'::character varying,
    storage_asset_presets json,
    custom_css text,
    storage_default_folder uuid,
    basemaps json,
    mapbox_key character varying(255),
    module_bar json,
    project_descriptor character varying(100),
    default_language character varying(255) DEFAULT 'en-US'::character varying NOT NULL,
    custom_aspect_ratios json,
    public_favicon uuid,
    default_appearance character varying(255) DEFAULT 'auto'::character varying NOT NULL,
    default_theme_light character varying(255),
    theme_light_overrides json,
    default_theme_dark character varying(255),
    theme_dark_overrides json,
    report_error_url character varying(255),
    report_bug_url character varying(255),
    report_feature_url character varying(255),
    public_registration boolean DEFAULT false NOT NULL,
    public_registration_verify_email boolean DEFAULT true NOT NULL,
    public_registration_role uuid,
    public_registration_email_filter json
);
 %   DROP TABLE public.directus_settings;
       public         heap r       postgres    false            �            1259    30815    directus_settings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.directus_settings_id_seq;
       public               postgres    false    252            �           0    0    directus_settings_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.directus_settings_id_seq OWNED BY public.directus_settings.id;
          public               postgres    false    253            �            1259    30816    directus_shares    TABLE     �  CREATE TABLE public.directus_shares (
    id uuid NOT NULL,
    name character varying(255),
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    role uuid,
    password character varying(255),
    user_created uuid,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_start timestamp with time zone,
    date_end timestamp with time zone,
    times_used integer DEFAULT 0,
    max_uses integer
);
 #   DROP TABLE public.directus_shares;
       public         heap r       postgres    false            �            1259    30823    directus_translations    TABLE     �   CREATE TABLE public.directus_translations (
    id uuid NOT NULL,
    language character varying(255) NOT NULL,
    key character varying(255) NOT NULL,
    value text NOT NULL
);
 )   DROP TABLE public.directus_translations;
       public         heap r       postgres    false                        1259    30828    directus_users    TABLE       CREATE TABLE public.directus_users (
    id uuid NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    email character varying(128),
    password character varying(255),
    location character varying(255),
    title character varying(50),
    description text,
    tags json,
    avatar uuid,
    language character varying(255) DEFAULT NULL::character varying,
    tfa_secret character varying(255),
    status character varying(16) DEFAULT 'active'::character varying NOT NULL,
    role uuid,
    token character varying(255),
    last_access timestamp with time zone,
    last_page character varying(255),
    provider character varying(128) DEFAULT 'default'::character varying NOT NULL,
    external_identifier character varying(255),
    auth_data json,
    email_notifications boolean DEFAULT true,
    appearance character varying(255),
    theme_dark character varying(255),
    theme_light character varying(255),
    theme_light_overrides json,
    theme_dark_overrides json
);
 "   DROP TABLE public.directus_users;
       public         heap r       postgres    false                       1259    30837    directus_versions    TABLE     �  CREATE TABLE public.directus_versions (
    id uuid NOT NULL,
    key character varying(64) NOT NULL,
    name character varying(255),
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    hash character varying(255),
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    user_updated uuid,
    delta json
);
 %   DROP TABLE public.directus_versions;
       public         heap r       postgres    false                       1259    30844    directus_webhooks    TABLE     $  CREATE TABLE public.directus_webhooks (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    method character varying(10) DEFAULT 'POST'::character varying NOT NULL,
    url character varying(255) NOT NULL,
    status character varying(10) DEFAULT 'active'::character varying NOT NULL,
    data boolean DEFAULT true NOT NULL,
    actions character varying(100) NOT NULL,
    collections character varying(255) NOT NULL,
    headers json,
    was_active_before_deprecation boolean DEFAULT false NOT NULL,
    migrated_flow uuid
);
 %   DROP TABLE public.directus_webhooks;
       public         heap r       postgres    false                       1259    30853    directus_webhooks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_webhooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.directus_webhooks_id_seq;
       public               postgres    false    258            �           0    0    directus_webhooks_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.directus_webhooks_id_seq OWNED BY public.directus_webhooks.id;
          public               postgres    false    259                       1259    30854    orders    TABLE     �   CREATE TABLE public.orders (
    id uuid NOT NULL,
    date_created timestamp with time zone,
    payment_method character varying(255),
    total_price numeric(10,5),
    cart uuid,
    shipping integer
);
    DROP TABLE public.orders;
       public         heap r       postgres    false                       1259    30857    products    TABLE     �   CREATE TABLE public.products (
    id integer NOT NULL,
    date_created timestamp with time zone,
    name text,
    description text,
    rating real DEFAULT '5'::real,
    image uuid,
    price real DEFAULT '129.9'::real,
    "Variations" integer
);
    DROP TABLE public.products;
       public         heap r       postgres    false                       1259    30864    products_files    TABLE     u   CREATE TABLE public.products_files (
    id integer NOT NULL,
    products_id integer,
    directus_files_id uuid
);
 "   DROP TABLE public.products_files;
       public         heap r       postgres    false                       1259    30867    products_files_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.products_files_id_seq;
       public               postgres    false    262            �           0    0    products_files_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.products_files_id_seq OWNED BY public.products_files.id;
          public               postgres    false    263                       1259    30868    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public               postgres    false    261            �           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public               postgres    false    264            	           1259    30869    shipping    TABLE     f  CREATE TABLE public.shipping (
    id integer NOT NULL,
    date_created timestamp with time zone,
    "firstName" character varying(255),
    "lastName" character varying(255),
    email character varying(255),
    address character varying(255),
    phone character varying(255),
    city character varying(255),
    "postalCode" character varying(255)
);
    DROP TABLE public.shipping;
       public         heap r       postgres    false            
           1259    30874    shipping_id_seq    SEQUENCE     �   CREATE SEQUENCE public.shipping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.shipping_id_seq;
       public               postgres    false    265            �           0    0    shipping_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.shipping_id_seq OWNED BY public.shipping.id;
          public               postgres    false    266                       1259    30875    slider_images    TABLE     �   CREATE TABLE public.slider_images (
    id integer NOT NULL,
    date_created timestamp with time zone,
    user_updated uuid,
    date_updated timestamp with time zone,
    image uuid,
    title text,
    description character varying(255)
);
 !   DROP TABLE public.slider_images;
       public         heap r       postgres    false                       1259    30880    slider_images_id_seq    SEQUENCE     �   CREATE SEQUENCE public.slider_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.slider_images_id_seq;
       public               postgres    false    267            �           0    0    slider_images_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.slider_images_id_seq OWNED BY public.slider_images.id;
          public               postgres    false    268                       1259    30881 
   variations    TABLE     �   CREATE TABLE public.variations (
    id integer NOT NULL,
    title character varying(255),
    "Options" json,
    prices json
);
    DROP TABLE public.variations;
       public         heap r       postgres    false                       1259    30886    variations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.variations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.variations_id_seq;
       public               postgres    false    269            �           0    0    variations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.variations_id_seq OWNED BY public.variations.id;
          public               postgres    false    270            &           2604    30887    Contacts id    DEFAULT     n   ALTER TABLE ONLY public."Contacts" ALTER COLUMN id SET DEFAULT nextval('public."Contacts_id_seq"'::regclass);
 <   ALTER TABLE public."Contacts" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217            '           2604    30888    Other_Images id    DEFAULT     v   ALTER TABLE ONLY public."Other_Images" ALTER COLUMN id SET DEFAULT nextval('public."Other_Images_id_seq"'::regclass);
 @   ALTER TABLE public."Other_Images" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219            (           2604    30889    cart_items id    DEFAULT     n   ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);
 <   ALTER TABLE public.cart_items ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    222            )           2604    30890    directus_activity id    DEFAULT     |   ALTER TABLE ONLY public.directus_activity ALTER COLUMN id SET DEFAULT nextval('public.directus_activity_id_seq'::regclass);
 C   ALTER TABLE public.directus_activity ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    226    225            6           2604    30891    directus_fields id    DEFAULT     x   ALTER TABLE ONLY public.directus_fields ALTER COLUMN id SET DEFAULT nextval('public.directus_fields_id_seq'::regclass);
 A   ALTER TABLE public.directus_fields ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    232    231            A           2604    30892    directus_notifications id    DEFAULT     �   ALTER TABLE ONLY public.directus_notifications ALTER COLUMN id SET DEFAULT nextval('public.directus_notifications_id_seq'::regclass);
 H   ALTER TABLE public.directus_notifications ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    238    237            H           2604    30893    directus_permissions id    DEFAULT     �   ALTER TABLE ONLY public.directus_permissions ALTER COLUMN id SET DEFAULT nextval('public.directus_permissions_id_seq'::regclass);
 F   ALTER TABLE public.directus_permissions ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    242    241            M           2604    30894    directus_presets id    DEFAULT     z   ALTER TABLE ONLY public.directus_presets ALTER COLUMN id SET DEFAULT nextval('public.directus_presets_id_seq'::regclass);
 B   ALTER TABLE public.directus_presets ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    245    244            P           2604    30895    directus_relations id    DEFAULT     ~   ALTER TABLE ONLY public.directus_relations ALTER COLUMN id SET DEFAULT nextval('public.directus_relations_id_seq'::regclass);
 D   ALTER TABLE public.directus_relations ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    247    246            R           2604    30896    directus_revisions id    DEFAULT     ~   ALTER TABLE ONLY public.directus_revisions ALTER COLUMN id SET DEFAULT nextval('public.directus_revisions_id_seq'::regclass);
 D   ALTER TABLE public.directus_revisions ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    249    248            T           2604    30897    directus_settings id    DEFAULT     |   ALTER TABLE ONLY public.directus_settings ALTER COLUMN id SET DEFAULT nextval('public.directus_settings_id_seq'::regclass);
 C   ALTER TABLE public.directus_settings ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    253    252            e           2604    30898    directus_webhooks id    DEFAULT     |   ALTER TABLE ONLY public.directus_webhooks ALTER COLUMN id SET DEFAULT nextval('public.directus_webhooks_id_seq'::regclass);
 C   ALTER TABLE public.directus_webhooks ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    259    258            j           2604    30899    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    264    261            m           2604    30900    products_files id    DEFAULT     v   ALTER TABLE ONLY public.products_files ALTER COLUMN id SET DEFAULT nextval('public.products_files_id_seq'::regclass);
 @   ALTER TABLE public.products_files ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    263    262            n           2604    30901    shipping id    DEFAULT     j   ALTER TABLE ONLY public.shipping ALTER COLUMN id SET DEFAULT nextval('public.shipping_id_seq'::regclass);
 :   ALTER TABLE public.shipping ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    266    265            o           2604    30902    slider_images id    DEFAULT     t   ALTER TABLE ONLY public.slider_images ALTER COLUMN id SET DEFAULT nextval('public.slider_images_id_seq'::regclass);
 ?   ALTER TABLE public.slider_images ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    268    267            p           2604    30903    variations id    DEFAULT     n   ALTER TABLE ONLY public.variations ALTER COLUMN id SET DEFAULT nextval('public.variations_id_seq'::regclass);
 <   ALTER TABLE public.variations ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    270    269            �          0    30641    Contacts 
   TABLE DATA           h   COPY public."Contacts" (id, date_created, "firstName", "lastName", email, subject, message) FROM stdin;
    public               postgres    false    217   ut      �          0    30647    Other_Images 
   TABLE DATA           v   COPY public."Other_Images" (id, user_created, date_created, banner1_image, banner2_image, about_us_image) FROM stdin;
    public               postgres    false    219   �t      �          0    30651    cart 
   TABLE DATA           >   COPY public.cart (id, date_created, "totalPrice") FROM stdin;
    public               postgres    false    221   )u      �          0    30654 
   cart_items 
   TABLE DATA           V   COPY public.cart_items (id, date_created, quantity, price, product, cart) FROM stdin;
    public               postgres    false    222   Fu      �          0    30658    directus_access 
   TABLE DATA           I   COPY public.directus_access (id, role, "user", policy, sort) FROM stdin;
    public               postgres    false    224   cu      �          0    30661    directus_activity 
   TABLE DATA           v   COPY public.directus_activity (id, action, "user", "timestamp", ip, user_agent, collection, item, origin) FROM stdin;
    public               postgres    false    225   v      �          0    30668    directus_collections 
   TABLE DATA           *  COPY public.directus_collections (collection, icon, note, display_template, hidden, singleton, translations, archive_field, archive_app_filter, archive_value, unarchive_value, sort_field, accountability, color, item_duplication_fields, sort, "group", collapse, preview_url, versioning) FROM stdin;
    public               postgres    false    227   ��      �          0    30679    directus_comments 
   TABLE DATA           �   COPY public.directus_comments (id, collection, item, comment, date_created, date_updated, user_created, user_updated) FROM stdin;
    public               postgres    false    228   7�      �          0    30686    directus_dashboards 
   TABLE DATA           f   COPY public.directus_dashboards (id, name, icon, note, date_created, user_created, color) FROM stdin;
    public               postgres    false    229   T�      �          0    30693    directus_extensions 
   TABLE DATA           R   COPY public.directus_extensions (enabled, id, folder, source, bundle) FROM stdin;
    public               postgres    false    230   q�      �          0    30699    directus_fields 
   TABLE DATA           �   COPY public.directus_fields (id, collection, field, special, interface, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, "group", validation, validation_message) FROM stdin;
    public               postgres    false    231   ��      �          0    30709    directus_files 
   TABLE DATA           6  COPY public.directus_files (id, storage, filename_disk, filename_download, title, type, folder, uploaded_by, created_on, modified_by, modified_on, charset, filesize, width, height, duration, embed, description, location, tags, metadata, focal_point_x, focal_point_y, tus_id, tus_data, uploaded_on) FROM stdin;
    public               postgres    false    233   �      �          0    30716    directus_flows 
   TABLE DATA           �   COPY public.directus_flows (id, name, icon, color, description, status, trigger, accountability, options, operation, date_created, user_created) FROM stdin;
    public               postgres    false    234   ��      �          0    30724    directus_folders 
   TABLE DATA           <   COPY public.directus_folders (id, name, parent) FROM stdin;
    public               postgres    false    235   �      �          0    30727    directus_migrations 
   TABLE DATA           I   COPY public.directus_migrations (version, name, "timestamp") FROM stdin;
    public               postgres    false    236   4�      �          0    30733    directus_notifications 
   TABLE DATA           �   COPY public.directus_notifications (id, "timestamp", status, recipient, sender, subject, message, collection, item) FROM stdin;
    public               postgres    false    237   һ      �          0    30741    directus_operations 
   TABLE DATA           �   COPY public.directus_operations (id, name, key, type, position_x, position_y, options, resolve, reject, flow, date_created, user_created) FROM stdin;
    public               postgres    false    239   �      �          0    30747    directus_panels 
   TABLE DATA           �   COPY public.directus_panels (id, dashboard, name, icon, color, show_header, note, type, position_x, position_y, width, height, options, date_created, user_created) FROM stdin;
    public               postgres    false    240   �      �          0    30755    directus_permissions 
   TABLE DATA           x   COPY public.directus_permissions (id, collection, action, permissions, validation, presets, fields, policy) FROM stdin;
    public               postgres    false    241   )�      �          0    30761    directus_policies 
   TABLE DATA           z   COPY public.directus_policies (id, name, icon, description, ip_access, enforce_tfa, admin_access, app_access) FROM stdin;
    public               postgres    false    243   �      �          0    30770    directus_presets 
   TABLE DATA           �   COPY public.directus_presets (id, bookmark, "user", role, collection, search, layout, layout_query, layout_options, refresh_interval, filter, icon, color) FROM stdin;
    public               postgres    false    244   ��      �          0    30778    directus_relations 
   TABLE DATA           �   COPY public.directus_relations (id, many_collection, many_field, one_collection, one_field, one_collection_field, one_allowed_collections, junction_field, sort_field, one_deselect_action) FROM stdin;
    public               postgres    false    246   x�      �          0    30785    directus_revisions 
   TABLE DATA           j   COPY public.directus_revisions (id, activity, collection, item, data, delta, parent, version) FROM stdin;
    public               postgres    false    248   ��      �          0    30791    directus_roles 
   TABLE DATA           M   COPY public.directus_roles (id, name, icon, description, parent) FROM stdin;
    public               postgres    false    250   �      �          0    30797    directus_sessions 
   TABLE DATA           n   COPY public.directus_sessions (token, "user", expires, ip, user_agent, share, origin, next_token) FROM stdin;
    public               postgres    false    251         �          0    30802    directus_settings 
   TABLE DATA           �  COPY public.directus_settings (id, project_name, project_url, project_color, project_logo, public_foreground, public_background, public_note, auth_login_attempts, auth_password_policy, storage_asset_transform, storage_asset_presets, custom_css, storage_default_folder, basemaps, mapbox_key, module_bar, project_descriptor, default_language, custom_aspect_ratios, public_favicon, default_appearance, default_theme_light, theme_light_overrides, default_theme_dark, theme_dark_overrides, report_error_url, report_bug_url, report_feature_url, public_registration, public_registration_verify_email, public_registration_role, public_registration_email_filter) FROM stdin;
    public               postgres    false    252          �          0    30816    directus_shares 
   TABLE DATA           �   COPY public.directus_shares (id, name, collection, item, role, password, user_created, date_created, date_start, date_end, times_used, max_uses) FROM stdin;
    public               postgres    false    254   =      �          0    30823    directus_translations 
   TABLE DATA           I   COPY public.directus_translations (id, language, key, value) FROM stdin;
    public               postgres    false    255   Z      �          0    30828    directus_users 
   TABLE DATA           T  COPY public.directus_users (id, first_name, last_name, email, password, location, title, description, tags, avatar, language, tfa_secret, status, role, token, last_access, last_page, provider, external_identifier, auth_data, email_notifications, appearance, theme_dark, theme_light, theme_light_overrides, theme_dark_overrides) FROM stdin;
    public               postgres    false    256   �      �          0    30837    directus_versions 
   TABLE DATA           �   COPY public.directus_versions (id, key, name, collection, item, hash, date_created, date_updated, user_created, user_updated, delta) FROM stdin;
    public               postgres    false    257   �      �          0    30844    directus_webhooks 
   TABLE DATA           �   COPY public.directus_webhooks (id, name, method, url, status, data, actions, collections, headers, was_active_before_deprecation, migrated_flow) FROM stdin;
    public               postgres    false    258   �      �          0    30854    orders 
   TABLE DATA           _   COPY public.orders (id, date_created, payment_method, total_price, cart, shipping) FROM stdin;
    public               postgres    false    260   �      �          0    30857    products 
   TABLE DATA           k   COPY public.products (id, date_created, name, description, rating, image, price, "Variations") FROM stdin;
    public               postgres    false    261         �          0    30864    products_files 
   TABLE DATA           L   COPY public.products_files (id, products_id, directus_files_id) FROM stdin;
    public               postgres    false    262   �      �          0    30869    shipping 
   TABLE DATA           x   COPY public.shipping (id, date_created, "firstName", "lastName", email, address, phone, city, "postalCode") FROM stdin;
    public               postgres    false    265   �      �          0    30875    slider_images 
   TABLE DATA           p   COPY public.slider_images (id, date_created, user_updated, date_updated, image, title, description) FROM stdin;
    public               postgres    false    267   �      �          0    30881 
   variations 
   TABLE DATA           B   COPY public.variations (id, title, "Options", prices) FROM stdin;
    public               postgres    false    269         �           0    0    Contacts_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Contacts_id_seq"', 6, true);
          public               postgres    false    218            �           0    0    Other_Images_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Other_Images_id_seq"', 1, true);
          public               postgres    false    220            �           0    0    cart_items_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cart_items_id_seq', 36, true);
          public               postgres    false    223            �           0    0    directus_activity_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.directus_activity_id_seq', 774, true);
          public               postgres    false    226            �           0    0    directus_fields_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.directus_fields_id_seq', 167, true);
          public               postgres    false    232            �           0    0    directus_notifications_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.directus_notifications_id_seq', 1, false);
          public               postgres    false    238            �           0    0    directus_permissions_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.directus_permissions_id_seq', 36, true);
          public               postgres    false    242            �           0    0    directus_presets_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.directus_presets_id_seq', 9, true);
          public               postgres    false    245            �           0    0    directus_relations_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.directus_relations_id_seq', 40, true);
          public               postgres    false    247            �           0    0    directus_revisions_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.directus_revisions_id_seq', 512, true);
          public               postgres    false    249            �           0    0    directus_settings_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.directus_settings_id_seq', 1, false);
          public               postgres    false    253            �           0    0    directus_webhooks_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.directus_webhooks_id_seq', 1, false);
          public               postgres    false    259            �           0    0    products_files_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.products_files_id_seq', 21, true);
          public               postgres    false    263            �           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 10, true);
          public               postgres    false    264            �           0    0    shipping_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.shipping_id_seq', 21, true);
          public               postgres    false    266            �           0    0    slider_images_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.slider_images_id_seq', 5, true);
          public               postgres    false    268            �           0    0    variations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.variations_id_seq', 2, true);
          public               postgres    false    270            r           2606    30922    Contacts Contacts_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Contacts" DROP CONSTRAINT "Contacts_pkey";
       public                 postgres    false    217            t           2606    30924    Other_Images Other_Images_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Other_Images"
    ADD CONSTRAINT "Other_Images_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Other_Images" DROP CONSTRAINT "Other_Images_pkey";
       public                 postgres    false    219            x           2606    30926    cart_items cart_items_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_pkey;
       public                 postgres    false    222            v           2606    30928    cart cart_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public                 postgres    false    221            z           2606    30930 $   directus_access directus_access_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.directus_access DROP CONSTRAINT directus_access_pkey;
       public                 postgres    false    224            |           2606    30932 (   directus_activity directus_activity_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_activity
    ADD CONSTRAINT directus_activity_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.directus_activity DROP CONSTRAINT directus_activity_pkey;
       public                 postgres    false    225            ~           2606    30934 .   directus_collections directus_collections_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.directus_collections
    ADD CONSTRAINT directus_collections_pkey PRIMARY KEY (collection);
 X   ALTER TABLE ONLY public.directus_collections DROP CONSTRAINT directus_collections_pkey;
       public                 postgres    false    227            �           2606    30936 (   directus_comments directus_comments_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.directus_comments DROP CONSTRAINT directus_comments_pkey;
       public                 postgres    false    228            �           2606    30938 ,   directus_dashboards directus_dashboards_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.directus_dashboards
    ADD CONSTRAINT directus_dashboards_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.directus_dashboards DROP CONSTRAINT directus_dashboards_pkey;
       public                 postgres    false    229            �           2606    30940 ,   directus_extensions directus_extensions_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.directus_extensions
    ADD CONSTRAINT directus_extensions_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.directus_extensions DROP CONSTRAINT directus_extensions_pkey;
       public                 postgres    false    230            �           2606    30942 $   directus_fields directus_fields_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.directus_fields
    ADD CONSTRAINT directus_fields_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.directus_fields DROP CONSTRAINT directus_fields_pkey;
       public                 postgres    false    231            �           2606    30944 "   directus_files directus_files_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.directus_files DROP CONSTRAINT directus_files_pkey;
       public                 postgres    false    233            �           2606    30946 .   directus_flows directus_flows_operation_unique 
   CONSTRAINT     n   ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_operation_unique UNIQUE (operation);
 X   ALTER TABLE ONLY public.directus_flows DROP CONSTRAINT directus_flows_operation_unique;
       public                 postgres    false    234            �           2606    30948 "   directus_flows directus_flows_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.directus_flows DROP CONSTRAINT directus_flows_pkey;
       public                 postgres    false    234            �           2606    30950 &   directus_folders directus_folders_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.directus_folders
    ADD CONSTRAINT directus_folders_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.directus_folders DROP CONSTRAINT directus_folders_pkey;
       public                 postgres    false    235            �           2606    30952 ,   directus_migrations directus_migrations_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.directus_migrations
    ADD CONSTRAINT directus_migrations_pkey PRIMARY KEY (version);
 V   ALTER TABLE ONLY public.directus_migrations DROP CONSTRAINT directus_migrations_pkey;
       public                 postgres    false    236            �           2606    30954 2   directus_notifications directus_notifications_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.directus_notifications DROP CONSTRAINT directus_notifications_pkey;
       public                 postgres    false    237            �           2606    30956 ,   directus_operations directus_operations_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_pkey;
       public                 postgres    false    239            �           2606    30958 5   directus_operations directus_operations_reject_unique 
   CONSTRAINT     r   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_reject_unique UNIQUE (reject);
 _   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_reject_unique;
       public                 postgres    false    239            �           2606    30960 6   directus_operations directus_operations_resolve_unique 
   CONSTRAINT     t   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_resolve_unique UNIQUE (resolve);
 `   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_resolve_unique;
       public                 postgres    false    239            �           2606    30962 $   directus_panels directus_panels_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.directus_panels DROP CONSTRAINT directus_panels_pkey;
       public                 postgres    false    240            �           2606    30964 .   directus_permissions directus_permissions_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.directus_permissions
    ADD CONSTRAINT directus_permissions_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.directus_permissions DROP CONSTRAINT directus_permissions_pkey;
       public                 postgres    false    241            �           2606    30966 (   directus_policies directus_policies_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_policies
    ADD CONSTRAINT directus_policies_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.directus_policies DROP CONSTRAINT directus_policies_pkey;
       public                 postgres    false    243            �           2606    30968 &   directus_presets directus_presets_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.directus_presets DROP CONSTRAINT directus_presets_pkey;
       public                 postgres    false    244            �           2606    30970 *   directus_relations directus_relations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.directus_relations
    ADD CONSTRAINT directus_relations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.directus_relations DROP CONSTRAINT directus_relations_pkey;
       public                 postgres    false    246            �           2606    30972 *   directus_revisions directus_revisions_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.directus_revisions DROP CONSTRAINT directus_revisions_pkey;
       public                 postgres    false    248            �           2606    30974 "   directus_roles directus_roles_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.directus_roles
    ADD CONSTRAINT directus_roles_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.directus_roles DROP CONSTRAINT directus_roles_pkey;
       public                 postgres    false    250            �           2606    30976 (   directus_sessions directus_sessions_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_pkey PRIMARY KEY (token);
 R   ALTER TABLE ONLY public.directus_sessions DROP CONSTRAINT directus_sessions_pkey;
       public                 postgres    false    251            �           2606    30978 (   directus_settings directus_settings_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_pkey;
       public                 postgres    false    252            �           2606    30980 $   directus_shares directus_shares_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.directus_shares DROP CONSTRAINT directus_shares_pkey;
       public                 postgres    false    254            �           2606    30982 0   directus_translations directus_translations_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.directus_translations
    ADD CONSTRAINT directus_translations_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.directus_translations DROP CONSTRAINT directus_translations_pkey;
       public                 postgres    false    255            �           2606    30984 *   directus_users directus_users_email_unique 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_email_unique UNIQUE (email);
 T   ALTER TABLE ONLY public.directus_users DROP CONSTRAINT directus_users_email_unique;
       public                 postgres    false    256            �           2606    30986 8   directus_users directus_users_external_identifier_unique 
   CONSTRAINT     �   ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_external_identifier_unique UNIQUE (external_identifier);
 b   ALTER TABLE ONLY public.directus_users DROP CONSTRAINT directus_users_external_identifier_unique;
       public                 postgres    false    256            �           2606    30988 "   directus_users directus_users_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.directus_users DROP CONSTRAINT directus_users_pkey;
       public                 postgres    false    256            �           2606    30990 *   directus_users directus_users_token_unique 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_token_unique UNIQUE (token);
 T   ALTER TABLE ONLY public.directus_users DROP CONSTRAINT directus_users_token_unique;
       public                 postgres    false    256            �           2606    30992 (   directus_versions directus_versions_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.directus_versions DROP CONSTRAINT directus_versions_pkey;
       public                 postgres    false    257            �           2606    30994 (   directus_webhooks directus_webhooks_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_webhooks
    ADD CONSTRAINT directus_webhooks_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.directus_webhooks DROP CONSTRAINT directus_webhooks_pkey;
       public                 postgres    false    258            �           2606    30996    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public                 postgres    false    260            �           2606    30998 "   products_files products_files_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.products_files
    ADD CONSTRAINT products_files_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.products_files DROP CONSTRAINT products_files_pkey;
       public                 postgres    false    262            �           2606    31000    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public                 postgres    false    261            �           2606    31002    shipping shipping_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.shipping
    ADD CONSTRAINT shipping_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.shipping DROP CONSTRAINT shipping_pkey;
       public                 postgres    false    265            �           2606    31004     slider_images slider_images_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.slider_images
    ADD CONSTRAINT slider_images_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.slider_images DROP CONSTRAINT slider_images_pkey;
       public                 postgres    false    267            �           2606    31006    variations variations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.variations
    ADD CONSTRAINT variations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.variations DROP CONSTRAINT variations_pkey;
       public                 postgres    false    269            �           2606    31007 "   cart_items cart_items_cart_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_foreign FOREIGN KEY (cart) REFERENCES public.cart(id) ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_cart_foreign;
       public               postgres    false    222    4982    221            �           2606    31012 %   cart_items cart_items_product_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_foreign FOREIGN KEY (product) REFERENCES public.products(id) ON DELETE SET NULL;
 O   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_product_foreign;
       public               postgres    false    222    5054    261            �           2606    31017 .   directus_access directus_access_policy_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_policy_foreign FOREIGN KEY (policy) REFERENCES public.directus_policies(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.directus_access DROP CONSTRAINT directus_access_policy_foreign;
       public               postgres    false    224    5022    243            �           2606    31022 ,   directus_access directus_access_role_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.directus_access DROP CONSTRAINT directus_access_role_foreign;
       public               postgres    false    224    5030    250            �           2606    31027 ,   directus_access directus_access_user_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.directus_access DROP CONSTRAINT directus_access_user_foreign;
       public               postgres    false    224    5044    256            �           2606    31032 7   directus_collections directus_collections_group_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_collections
    ADD CONSTRAINT directus_collections_group_foreign FOREIGN KEY ("group") REFERENCES public.directus_collections(collection);
 a   ALTER TABLE ONLY public.directus_collections DROP CONSTRAINT directus_collections_group_foreign;
       public               postgres    false    227    4990    227            �           2606    31037 8   directus_comments directus_comments_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 b   ALTER TABLE ONLY public.directus_comments DROP CONSTRAINT directus_comments_user_created_foreign;
       public               postgres    false    228    5044    256            �           2606    31042 8   directus_comments directus_comments_user_updated_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id);
 b   ALTER TABLE ONLY public.directus_comments DROP CONSTRAINT directus_comments_user_updated_foreign;
       public               postgres    false    228    5044    256            �           2606    31047 <   directus_dashboards directus_dashboards_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_dashboards
    ADD CONSTRAINT directus_dashboards_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 f   ALTER TABLE ONLY public.directus_dashboards DROP CONSTRAINT directus_dashboards_user_created_foreign;
       public               postgres    false    229    5044    256            �           2606    31052 ,   directus_files directus_files_folder_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_folder_foreign FOREIGN KEY (folder) REFERENCES public.directus_folders(id) ON DELETE SET NULL;
 V   ALTER TABLE ONLY public.directus_files DROP CONSTRAINT directus_files_folder_foreign;
       public               postgres    false    233    5006    235            �           2606    31057 1   directus_files directus_files_modified_by_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_modified_by_foreign FOREIGN KEY (modified_by) REFERENCES public.directus_users(id);
 [   ALTER TABLE ONLY public.directus_files DROP CONSTRAINT directus_files_modified_by_foreign;
       public               postgres    false    233    5044    256            �           2606    31062 1   directus_files directus_files_uploaded_by_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_uploaded_by_foreign FOREIGN KEY (uploaded_by) REFERENCES public.directus_users(id);
 [   ALTER TABLE ONLY public.directus_files DROP CONSTRAINT directus_files_uploaded_by_foreign;
       public               postgres    false    233    5044    256            �           2606    31067 2   directus_flows directus_flows_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 \   ALTER TABLE ONLY public.directus_flows DROP CONSTRAINT directus_flows_user_created_foreign;
       public               postgres    false    234    5044    256            �           2606    31072 0   directus_folders directus_folders_parent_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_folders
    ADD CONSTRAINT directus_folders_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_folders(id);
 Z   ALTER TABLE ONLY public.directus_folders DROP CONSTRAINT directus_folders_parent_foreign;
       public               postgres    false    235    5006    235            �           2606    31077 ?   directus_notifications directus_notifications_recipient_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_recipient_foreign FOREIGN KEY (recipient) REFERENCES public.directus_users(id) ON DELETE CASCADE;
 i   ALTER TABLE ONLY public.directus_notifications DROP CONSTRAINT directus_notifications_recipient_foreign;
       public               postgres    false    237    5044    256            �           2606    31082 <   directus_notifications directus_notifications_sender_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_sender_foreign FOREIGN KEY (sender) REFERENCES public.directus_users(id);
 f   ALTER TABLE ONLY public.directus_notifications DROP CONSTRAINT directus_notifications_sender_foreign;
       public               postgres    false    237    5044    256            �           2606    31087 4   directus_operations directus_operations_flow_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_flow_foreign FOREIGN KEY (flow) REFERENCES public.directus_flows(id) ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_flow_foreign;
       public               postgres    false    239    5004    234            �           2606    31092 6   directus_operations directus_operations_reject_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_reject_foreign FOREIGN KEY (reject) REFERENCES public.directus_operations(id);
 `   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_reject_foreign;
       public               postgres    false    239    5012    239            �           2606    31097 7   directus_operations directus_operations_resolve_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_resolve_foreign FOREIGN KEY (resolve) REFERENCES public.directus_operations(id);
 a   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_resolve_foreign;
       public               postgres    false    239    5012    239            �           2606    31102 <   directus_operations directus_operations_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 f   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_user_created_foreign;
       public               postgres    false    239    5044    256            �           2606    31107 1   directus_panels directus_panels_dashboard_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_dashboard_foreign FOREIGN KEY (dashboard) REFERENCES public.directus_dashboards(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.directus_panels DROP CONSTRAINT directus_panels_dashboard_foreign;
       public               postgres    false    240    4994    229            �           2606    31112 4   directus_panels directus_panels_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 ^   ALTER TABLE ONLY public.directus_panels DROP CONSTRAINT directus_panels_user_created_foreign;
       public               postgres    false    240    5044    256            �           2606    31117 8   directus_permissions directus_permissions_policy_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_permissions
    ADD CONSTRAINT directus_permissions_policy_foreign FOREIGN KEY (policy) REFERENCES public.directus_policies(id) ON DELETE CASCADE;
 b   ALTER TABLE ONLY public.directus_permissions DROP CONSTRAINT directus_permissions_policy_foreign;
       public               postgres    false    241    5022    243            �           2606    31122 .   directus_presets directus_presets_role_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.directus_presets DROP CONSTRAINT directus_presets_role_foreign;
       public               postgres    false    244    5030    250            �           2606    31127 .   directus_presets directus_presets_user_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.directus_presets DROP CONSTRAINT directus_presets_user_foreign;
       public               postgres    false    244    5044    256            �           2606    31132 6   directus_revisions directus_revisions_activity_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_activity_foreign FOREIGN KEY (activity) REFERENCES public.directus_activity(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.directus_revisions DROP CONSTRAINT directus_revisions_activity_foreign;
       public               postgres    false    248    4988    225            �           2606    31137 4   directus_revisions directus_revisions_parent_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_revisions(id);
 ^   ALTER TABLE ONLY public.directus_revisions DROP CONSTRAINT directus_revisions_parent_foreign;
       public               postgres    false    248    5028    248            �           2606    31142 5   directus_revisions directus_revisions_version_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_version_foreign FOREIGN KEY (version) REFERENCES public.directus_versions(id) ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.directus_revisions DROP CONSTRAINT directus_revisions_version_foreign;
       public               postgres    false    248    5048    257            �           2606    31147 ,   directus_roles directus_roles_parent_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_roles
    ADD CONSTRAINT directus_roles_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_roles(id);
 V   ALTER TABLE ONLY public.directus_roles DROP CONSTRAINT directus_roles_parent_foreign;
       public               postgres    false    5030    250    250            �           2606    31152 1   directus_sessions directus_sessions_share_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_share_foreign FOREIGN KEY (share) REFERENCES public.directus_shares(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.directus_sessions DROP CONSTRAINT directus_sessions_share_foreign;
       public               postgres    false    5036    254    251            �           2606    31157 0   directus_sessions directus_sessions_user_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.directus_sessions DROP CONSTRAINT directus_sessions_user_foreign;
       public               postgres    false    251    5044    256            �           2606    31162 8   directus_settings directus_settings_project_logo_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_project_logo_foreign FOREIGN KEY (project_logo) REFERENCES public.directus_files(id);
 b   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_project_logo_foreign;
       public               postgres    false    5000    233    252            �           2606    31167 =   directus_settings directus_settings_public_background_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_background_foreign FOREIGN KEY (public_background) REFERENCES public.directus_files(id);
 g   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_public_background_foreign;
       public               postgres    false    252    233    5000            �           2606    31172 :   directus_settings directus_settings_public_favicon_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_favicon_foreign FOREIGN KEY (public_favicon) REFERENCES public.directus_files(id);
 d   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_public_favicon_foreign;
       public               postgres    false    233    5000    252            �           2606    31177 =   directus_settings directus_settings_public_foreground_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_foreground_foreign FOREIGN KEY (public_foreground) REFERENCES public.directus_files(id);
 g   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_public_foreground_foreign;
       public               postgres    false    233    252    5000            �           2606    31182 D   directus_settings directus_settings_public_registration_role_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_registration_role_foreign FOREIGN KEY (public_registration_role) REFERENCES public.directus_roles(id) ON DELETE SET NULL;
 n   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_public_registration_role_foreign;
       public               postgres    false    252    5030    250            �           2606    31187 B   directus_settings directus_settings_storage_default_folder_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_storage_default_folder_foreign FOREIGN KEY (storage_default_folder) REFERENCES public.directus_folders(id) ON DELETE SET NULL;
 l   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_storage_default_folder_foreign;
       public               postgres    false    5006    235    252            �           2606    31192 2   directus_shares directus_shares_collection_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_collection_foreign FOREIGN KEY (collection) REFERENCES public.directus_collections(collection) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.directus_shares DROP CONSTRAINT directus_shares_collection_foreign;
       public               postgres    false    4990    254    227            �           2606    31197 ,   directus_shares directus_shares_role_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.directus_shares DROP CONSTRAINT directus_shares_role_foreign;
       public               postgres    false    250    254    5030            �           2606    31202 4   directus_shares directus_shares_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 ^   ALTER TABLE ONLY public.directus_shares DROP CONSTRAINT directus_shares_user_created_foreign;
       public               postgres    false    256    254    5044            �           2606    31207 *   directus_users directus_users_role_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE SET NULL;
 T   ALTER TABLE ONLY public.directus_users DROP CONSTRAINT directus_users_role_foreign;
       public               postgres    false    256    5030    250            �           2606    31212 6   directus_versions directus_versions_collection_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_collection_foreign FOREIGN KEY (collection) REFERENCES public.directus_collections(collection) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.directus_versions DROP CONSTRAINT directus_versions_collection_foreign;
       public               postgres    false    257    4990    227            �           2606    31217 8   directus_versions directus_versions_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 b   ALTER TABLE ONLY public.directus_versions DROP CONSTRAINT directus_versions_user_created_foreign;
       public               postgres    false    5044    256    257            �           2606    31222 8   directus_versions directus_versions_user_updated_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id);
 b   ALTER TABLE ONLY public.directus_versions DROP CONSTRAINT directus_versions_user_updated_foreign;
       public               postgres    false    257    5044    256            �           2606    31227 9   directus_webhooks directus_webhooks_migrated_flow_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_webhooks
    ADD CONSTRAINT directus_webhooks_migrated_flow_foreign FOREIGN KEY (migrated_flow) REFERENCES public.directus_flows(id) ON DELETE SET NULL;
 c   ALTER TABLE ONLY public.directus_webhooks DROP CONSTRAINT directus_webhooks_migrated_flow_foreign;
       public               postgres    false    5004    258    234            �           2606    31232    orders orders_cart_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_cart_foreign FOREIGN KEY (cart) REFERENCES public.cart(id) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_cart_foreign;
       public               postgres    false    221    260    4982            �           2606    31237    orders orders_shipping_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_shipping_foreign FOREIGN KEY (shipping) REFERENCES public.shipping(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_shipping_foreign;
       public               postgres    false    5058    260    265            �           2606    31242 0   Other_Images other_images_about_us_image_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public."Other_Images"
    ADD CONSTRAINT other_images_about_us_image_foreign FOREIGN KEY (about_us_image) REFERENCES public.directus_files(id) ON DELETE SET NULL;
 \   ALTER TABLE ONLY public."Other_Images" DROP CONSTRAINT other_images_about_us_image_foreign;
       public               postgres    false    219    233    5000            �           2606    31247 /   Other_Images other_images_banner1_image_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public."Other_Images"
    ADD CONSTRAINT other_images_banner1_image_foreign FOREIGN KEY (banner1_image) REFERENCES public.directus_files(id) ON DELETE SET NULL;
 [   ALTER TABLE ONLY public."Other_Images" DROP CONSTRAINT other_images_banner1_image_foreign;
       public               postgres    false    5000    219    233            �           2606    31252 /   Other_Images other_images_banner2_image_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public."Other_Images"
    ADD CONSTRAINT other_images_banner2_image_foreign FOREIGN KEY (banner2_image) REFERENCES public.directus_files(id) ON DELETE SET NULL;
 [   ALTER TABLE ONLY public."Other_Images" DROP CONSTRAINT other_images_banner2_image_foreign;
       public               postgres    false    5000    219    233            �           2606    31257 .   Other_Images other_images_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public."Other_Images"
    ADD CONSTRAINT other_images_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id);
 Z   ALTER TABLE ONLY public."Other_Images" DROP CONSTRAINT other_images_user_created_foreign;
       public               postgres    false    256    219    5044            �           2606    31262 7   products_files products_files_directus_files_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.products_files
    ADD CONSTRAINT products_files_directus_files_id_foreign FOREIGN KEY (directus_files_id) REFERENCES public.directus_files(id) ON DELETE SET NULL;
 a   ALTER TABLE ONLY public.products_files DROP CONSTRAINT products_files_directus_files_id_foreign;
       public               postgres    false    5000    233    262            �           2606    31267 1   products_files products_files_products_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.products_files
    ADD CONSTRAINT products_files_products_id_foreign FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE SET NULL;
 [   ALTER TABLE ONLY public.products_files DROP CONSTRAINT products_files_products_id_foreign;
       public               postgres    false    262    5054    261            �           2606    31272    products products_image_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_image_foreign FOREIGN KEY (image) REFERENCES public.directus_files(id) ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_image_foreign;
       public               postgres    false    233    5000    261            �           2606    31277 $   products products_variations_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_variations_foreign FOREIGN KEY ("Variations") REFERENCES public.variations(id);
 N   ALTER TABLE ONLY public.products DROP CONSTRAINT products_variations_foreign;
       public               postgres    false    269    261    5062            �           2606    31282 )   slider_images slider_images_image_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.slider_images
    ADD CONSTRAINT slider_images_image_foreign FOREIGN KEY (image) REFERENCES public.directus_files(id) ON DELETE SET NULL;
 S   ALTER TABLE ONLY public.slider_images DROP CONSTRAINT slider_images_image_foreign;
       public               postgres    false    267    233    5000            �           2606    31287 0   slider_images slider_images_user_updated_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.slider_images
    ADD CONSTRAINT slider_images_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id);
 Z   ALTER TABLE ONLY public.slider_images DROP CONSTRAINT slider_images_user_updated_foreign;
       public               postgres    false    256    267    5044            �      x������ � �      �   �   x���� гV����A�Բ��	�޼VL���A(&$|b��Pf��֕�0��:�?����%�_�r����5DG�Rb���-����}%�GB�s$�uh瑌iOIk�8��ogfb���������w�Z���+	      �      x������ � �      �      x������ � �      �   �   x����0c���  ��	W����K�<���ݡ����iР@��`v��Qz��?s��<cqA�fe�;�p:z�/n<bW*���#d�wv����ٵ��m61jt��Tg<�={�J;��"��d@|	�$c��t��J4��k����2!1�      �      x�ݝ[o$9v�5�B�6v���-��,vޱ�kF\��K�R���O�dDdd��'S:Ԉ��C����� ���?����/_�&���
����a��2g��wZj+�:�ku yС���i���L�������۟l#���_�O�������^���������?����|��8����������q������������ÿ���}�������뷧�Ɵ�1�O����N����_������?�x�=����߿~���o}z�~��?����~I��Z6Q&�1=����BPM9*(^�A�rTǋ� ����3CՕ����"��U5R2ە��Q�e��?=>��{x��|��������`�lwP!}�\�����%��]����f;\�*����h�L����o���:F��ݏ�C�\����������*�v�Ђm{ፔ��	&�.ss7��#e@L���6�0;�PV��J�1m܍�����Z�B7�xJ�������J �_��U��6�/�4�1
�CR�R�Ky�� sD�'�{L�����Ԋ~�G��	$�ºVIׅq�#6�0��P�ю��ֲ2ll|m1yR@*}��	�waM�T�Ms�D`�ZM	d8H݀�<�o���Ț�<�N��_�Y)�����m\dƊf�)��#��YIxɌ5���/X�6/�r��Ć2���T�$����|� SD��E�
�zP�O�9H��ȥ�u�������`a���
+}J�n�����nc�C���`�O�+��n�����^:���ى���)�M64���^*��A<_$�fxn� � 6���9�q�6g,0�4�:��A#-�e}��T����3��X8 tA����ļ���#�����]3tAu�Ul��#,��.�6X6G���}~|�o??�����@X3�q��ʕ�W3�Ig�,���)�Y��1�tA5ê�&53�1�tE���|��ܖ1&�DQ-���z+��DP���,�m��Za3X��G["���\6���۵_��:vm��Rp������l0�lKV�M'�.3}�Ť�%�D
j�3\�Ꮀh�9YP�`�e�&-YO�X�{��GK�S'Xv'0�h�zj�M?_r�d�'���(����2�>�k7�l0����r��4�pY���l�r�3���������&��]�L�x00wf[n�3&zE��Ȱ6�W�p��PX] if�,�[i,O�L�������Jcyr��ke����zz�s>�&h.G���R;�r�bkU�,���EO�&b6P���f����G3�I��ZV K�x���4\&���:��V�2�3�6ρr���
6o_�M��;.gG=�����5�[��{aM���E���r{�z=}���ǋ~��T������{<��e�w�X���6��|nc5ܪ�X�'��ĝX#�,���H�����,��%2je�V���X$�Vn���FLy7X[�.��W�"�Q���'Й�ܲ���HqO�ܲ���"%�Փu�N�v��E�)�=Hl0o��J)��c�&���!+Y��r	,=ܾ[�HD-�ܮ{b��E*j�u�&ߏ�D�ª���v\$�Xn�+�q��Zh�}�Wv�"��r�h�(O�"��r��E��
ET��v3�������0}{8��E����=T���7�hQ�R�`�5��_m��J�����?�R�`�%T�O�TD�&�;�`qE7�<�r����fy�f�1�鮖'X6b75#���D��׌t��mmO�kF]��"��z �e�Aچ[�seG.�Q� R5���F�����L�:���g���[m��Ɗ� �J)ڮ��K�@�~򨁶&7�.��`6�^C+b�i�j�B4��M?��o��(i�:�D�<�Gg:/t+A@����`�Vm���u-�:���_�pL�wf򓰦� S��^�H��~��o�c��yFէ<�vڏi�LZ0�N�>��*�a2����<:�v����M��:O��kq/XQA@���XU�#�+�����'V.��������q�Xk�}��~|�	<�4��:�!�C�w��^;���$���0���"��Ơ�����
�V	d�]`�Kg� ���R��m?��Q$����d����M����1��1AR4I��Z��٩GW���4��y8:��������ŀM�?h��S��0$9��t?�e8�nL������v�'��a�V4Kw=�֎c^��o�����vS�vʣ�����)m~�"2�Z����2�a&^KѦ�L�5��{��t_�e8lht����h$Fwͨ�~}��&�钂�Ԙf���G5�a�1`����߮v���̣ʞn����_�+��΀h��I�t�"e�)H-����X4��$���9JO�UvfڴiTq��>��}o'��"9�4�콱P�Nw�܈U�/�"1*Y�6�'����"1*\mQ!r!�\js�7ݱS냄��"�qޯ�����;.�Ǭ��I#b`�ȦJ�_��F�ۈ� �p�l����*_���Q�j#sd#���2,3X��wd#��u !w���ћ��=�����L��������Z����b�O31[���\��#-�8�D��r3U|�"���l,���p����?�y�)G�a�����$~
�Oz}�$I��T`yb���6�L�ۃD��zb�o��`�Z\h�h��5}�Ֆ�[S�}�GQ��������b�j>}F�%�t�]1���2��чŔ'���i��G��b��L�`�lZ��R��dzF�,<B_�R�HY��V0j�[N_��ĺݞ�v���l�݆"e��2�_h��6��g�\��W�������p0�Gx�R�}�ݴBQ˧��nw{-��
E,���H�LGZ4�Eu�?��|����z_N�j��lY�Y�c���,����rY�7�X!<�e&��V$��h��bѬF,J`���N#<]�tUȢR�����p��.8al̗4���Zh7�����K�Hx��&2�{̷pӛ��Bk���$�+�I�}l����Y�����J�ީ��8�����{�v]'tZ'#h�^��E�ǐ�qP[��[h�K
�Z$4�v������4A�At��D�;�ʾv�d;�n�>%��4�4�Q1r�`T;i���p�~]�0J�������(ɩ��p������+O��eIFmeUL.����Z�d�4d�w[�Z�ŮG,S����{b69��h{�T��yD� X.���bZ��>���3�)�opvҵ����P�-$؆�Z?A�<X�B��g�P����,�㤆A$-<
�G)B����G�:����E����Q�=��Y��%�oE�]O�>v,y�eI^|�4\6�c�_�%R�ܺ���ʭ�S�J��|m���X^N�іh��g�mѕ�Jʟ��tJsk��hءJ�r0_��l.fiуG�(0����p��8,ɨU��ʦ��	�utX�D+�~RqVײ�lOvX�^S��7Z�Hɬ2d�P�j���5|"��M�P�������2������iE�-���n�;Z>�7u2�MO��1{\'S�����n}�:�ꦿ�������ꦿ�eT��P����l�ތ
t����w�r-���.�j���������Eu2��~O�E��T+�=-�~�}!�o�}G���6[n���T���vɡ{n�T��=m�"�^.������Q�ŷ�Ͻ��<�\\����+>�j�Gf��|����T��r`��:CF���v_�edT� 9�?!��b����Ǎ��F[n�6N[����¬B�llGZ4V���1�v�܂�ڏ�h�L�j���+inm`c���z􈦺5�h#��=��f�g�\v�W�����z�g#����
�������$�옓i�+��Mg|ߢ�Lϴ����
\��#-��duu�����+Z4%B5���r�V�=�OO_��W��-]f%fs��q���Yr��Bk�(nK�-�Y0{s�	���ȕ�,��tM`�[�ё#�;,���F�MS�sK�|,�����������    j�vs���t����Frs{�h�Ow{δ� c���T/�ݞZ��V1�j4Χ�=�,t� �l���R�h�@wyސ��3d|�"w�����y|H�o��_��%o�wr�V�݂��n��A���!�\�;�dߛ��s �˞��i]k�|Ӊ�r��\��dg�L9���{��!ҝ�7Z�9�^n���6�'tf:ކC�i��r���Z�M�Y>��z����Yf����B�1l��*z��(x�g#�o�oC��Zi�}�x�2)�0�ϱ������P(��6I&�7��C�ޚa��^7���~�;Zns�f'BI
bΦ���=f��$��Ҳ��p�ſ[z9�Hj���{g�����f�4�[}:��U��J%Z����3�WEz���,dh�K7j>��	~ߗ䠛2/��5��o@�~���Bku���h�O�Tδ:�+v����ʙ��d�ͱ5S�t��L��bn����(�n�|�喯��r6t[�-�n��q����ׯ_~A��V�簓\���4c!��E+�~G�͂!b���"�r�3���φj{l�<�l�p�H��gCu5>��Xn�S�F�VGZ�M힋wL-QUa�b�ܢވ)f#��j�M��o7�1�l���GZ���e_��$�Q�����$��О=��m�a�Q�r�5�IFM3�"�w�\��-�L����=+7��ZfE���r�[��U�2�-���e�QE�j�e�2�u�L���Vg��$j�i��ꌖY�5�4��j��嶐Q����e�m�C��r!e�8���4���fv �N�F�S�>h�D�,��$>�E٩���[��Zp�dl������O�GlȖ��ڍ�DC?]��2ف��(�F�(U�Ʊycq�EC���;�>e���1��x�Ui�
7�1%��jj<�j�?]>�.$�m��2��w�����Ms��A�و�vK�v����2_�4'����5ZW;�1\81VrNi��>�)�N�A�P9gZ���o�}ch(N5�\h���2�k0
��6��Tʸ�Îes+���҆ˬ�sE�9���F�%���Nz���	��'z5� Y �h�m����:ݎ���EoI ��VZ�Hn��W^ �\k�����>f`�HU-�����Їɪ�ͫ�o>�ș���1Xd�~��1�==���E%Wۛ������|�5�`��G�fl��2s\�u�\�%��/�p�����qW�ݛ��݂k�Ǿ�B��T����A>�w�j]g���˭Ǒ�V��I���|i6MPgv���.�W+2�|��/�q�"��K�!��\�;!���y��F�T��=2�ۙ{d��(��wBfs���]��Z�ټ}��ĮHq��Fr9�ϐ����|�#����Oa����#&'��-̨F�. 1��G����J���i*O�ג���At��cQ� L�v�ס!%�4}+ʤ_�r�o7�8gI�k�\O��%�����Uf��Yy�4�ɷ[�e��F��D�eC�@���1ݵ}�"˔�����A���깾@B��6�#�7�dI��r8�$��[(M��U�{�\�e��k���L���"��f�R0�B4��KR[ٰ�5�s+��9�P�ֲsi`���p��ꤞp]�>I��_5]́���l��͞Xᩬ@|�o�չQ	��(��K�P3.�Fr��y�^<t�6h>f/-���U������N�o���k�D�*6Fq������k����Y��l���OS���z�3@�M�{�{i:c5��=S��<䀡��[ү����9!4��7���c,QUZ�0W�9�������2�˷�9Dz��	���z[m4�(�#2����j��^	<!s	�?�6J�\_FD��h���6�R��wȑ��2~��H�#2�O?�詮�v��22�-�,QdGd6g��n ��4"&g�4���94y6�l8@5�M>���$��s�^�����Hz�،���b���N��L��_�Ў���:�@��ٳDƿm_��W��LJ$݃���M�F�Ɉܬ�%�2\���̨���:]�Z��l"���@��|��cW�ܒR�q�,�Ō���J�Y�I�g��l/�$��L�d�+~�3�+d0��	�p��L~Ѥ�W��h-[�A��|��($@ޅ��Qt��aҢoC�!��MA����� �c�a|�k��=���z]�%�uj?^��a��Ϧ��]/Z!��UlC�WQ��&͵Ti�M�����H�.��C����kɵ��������?����_�����1��?���m�����;i��^D��D�����k��������o���p�w�ﱲ�cP6�A�Ѧu.U+�m��`�l'm�K��®%��2f�Sy5\~켋�RH�i�c
1��91��a��	���K�A���v�R�X>r�!�n*K��m`z]�4<@����Z�6��͋��u0�� �A���e�o��8t}g[1:�rf]��D��Lv��qB�����4<����ֶR(�ux|�ȍ��$^�50��3m�M��HC~R+A�"@�F��w�9�Ƅ߆~��R�G3I���B�]'�����SFC�I�������_����6��7t��eB}W�7��)��+'���@7�Ϝ1z՝�K/&�)Ry� p��M���A(�x1g7|����oOÏ�ʏuB�+����z�(��)�je��T%�b������T�{��9Cj�"��uϛwM��r�L&�N7\{�d�,��?Qry��,�nM�ss��O�ri]�RH�X��3�u:\�K)�I+�Is�ѠJ��O�[9Tl���-�a� �O�����(EtR	��1�ə��A�Ϙ#�fI��س��@���n��7���:�������ҦV�U����ފ���N���E�r��[���%,~6��l������g �ZA����3ْ�S�
���60	��h�`�T�[�]����S`������>V���o�ϏG��fF/�ݙ
��7X��c�g�D3���d0Z5-p��`k����w�ϔ6E���e��~�>?�"CUmӼǇa����o�/�d��:�H�Qy����S���:�.
ێ���{�Kqy��*)M�XM��^+b�Rݖ9D��'#|��G��Aj��v ���Ʀy�C���ޡMi��J2��Fˣ)�6�'�J�t��kp�G�BI�.�����St��^)�V+k�����D��)�M/�8L"}�^t�8�Q������(9�#�P��<NӅ�se���V��V��3���s��� �9�v�U#���l?�Ab}O!?�`}��������i��ZT� B���5.�1���h����ΆX;����I���cjfc�ۺu���$t�5Ҿ���t�u��'vщ��	�勴�_5���~�6D7:���qD�}���8(k�rʊ�o�_u3����]|Z�-���z�[+e���!�LkzHaZ'��Ʈ�]��G��&On0O����{<v�� p8�h�hz��i*�SG�:���y�l\�WR�	Ǖ���t��Šu
Ook:R��?�]����H��ՒwmM��^c�(�m
v�Qv"�ь��v�J����ȱ�j8Mr�H��]�[�������枭��BJ
��4�**�hC��i'Tlz�)�J��qL2n�aX?�i����"�49�#_�D�Y�o���׵�}�t���c�����v��+����K��3�m��Wk�Ya��^�V(�m,z7�0�^�A�$�h�VL���Я�_�pf������V6�R��Obc���N@�i��	��S�4���Wx,���l��8?�����S:!�^� ��ڻV���㋘��k�wNϡ�"b�q��}d�:iH��j�Iж*��R	���J���.1��ep�������o_ڟ�9nt�5���O�FC?%�F��c�����`�OH?ˠ�|9Y��9�GB��NǴg�}����N� ڴok��|�`�Zbm����G�)+�m�=i�Y��o���b]Z�f�E����W�y���&���Jð<b����X�2C�T���b�,�t�����|�<A�&%�Ήo,.p��ٖ]����\�y#��m�}    ;ܼ��^�p�m��n�A����b�J+�T3.�&��v߮��A�綶A``�A$�1�'�Nc���D�� �[�A`��I�uJ����O'k_<��Y)K$�JY�M�����Y�͎�\&��j����W*b�5�vCm��	3.�tj��d莤�4Yn�N������)[��e>P%(�+<QeTna����N�NÔ$g�%�ʌIw�:	/�������u��o�W��p(<\�,���y�#�N�c��qc��:��0�J�ON	H�o�m��Kմ�~�/�͹�IG}!���Q��Jg�`e~nM]�o[��]�&T��ot�j+<�n�����v�谺�E-�7��7hyС3��يw���������slL;#Li� �hA2N>����h+�ՎW�&���ոZ�^;�h�m;f�3Z) t:	�.
�t�*����.IAY�S����}ˡ�K�L�b$��r�A���An?IWΒTґ�r4~�L]9KrI+'�4���u�,I&%Ne<Z]i��2���0Ծ�Tʭ�@7>_�!4Nq�E��l���	��*�V̒R_�Ԯ	���
�N� 
�<J}�0b<=e}6��Ti��04�f�v�����8�\�;-x\3����
�4A�n�r+]�D��ϥ!}��#��JRjA�LC�����]IJ�p���҆:�I��N�ˤ_��0���	���z��wڳ��VZ�������+�Ӳ����j~7�e��V�㏁��l��_�O��C����:�d}��a~&������Y��@���rԭ��l��O�u'�@N-��a���}r*i�U�Q������h�9�PWk���b1�/�Z�0tm�=Z��H�l�������U�b�I�^�M�b ���c�.mF}�&�Q�8u"L���F��ҵ]ע�H�k��&��~�i�9A�n(<>�U绱�F#��Z���Fu!��(�o����r�;�����&S��b�{�~}۶i8�U"zТ����w��P�Iu�>�	�������3zDۋ�D��E��q7E�@�E��Ǩ����hi������!���j/�k�1j���@���-����.��=D��]uڨ��b�~:@/5守U��v�tD���]�{��a�1�ӧ�prZ�n��%+Zc��[h9�C�E�@�t�4VV>q�q{����×�[�$��sc������2~<�}r�:�ʰ�c>:��Ht-���3pt��#nu�����/��qkW�7����1���ӗ�N�@��-�N�9�����ؠo3�F�����j��
.����[Z{\.��_�����(3�]I�����f��o����N"1�S��D/`�^tnS���.��`�뉞�N�<*F����_/|4T�ėڎ�&V�C�h���~{x~�� ~d{bZhO��?=CF�m�h��=2�Ǉ�a|�k�)���S���h���dy:�&���	-հz�uI_ۛ�=y�v1��#C�#�n�D���p_۴�5.��J���)�mBm;�׸�Jd�\���`��D�$\k�P;�u��Bc�P�IV��e�ϐ��#؂zA注?䈎�f�eD\�ժ���c�Ė�7fovm*�Q�qD�ne���k���E��T�W��0]���ܒ�h�n��������I�e�wު�T n
'�w�ڹ�k�t�grK��d<o�X��ɒ������6f�t��:��eH�M����[L�Ŝb'�.2,�pT��evuN��F2�"cG���q�K����ݷ�e��"ޚYp��[���;���!;뙜��F�N�㡙ֆ��~=�=��x(��M!Q�u~��E�N�!$tl4� �-Q	�b�����.����?hl�GO_�Ǯ&^}]p�b�e�b�\z�7�Z�@m�����㿄�c/v�S}̖�e�T%A���-9wA�M��]@�%朦G�3n�̡�-��w!�܍.zS�sW�6�{��F��܅��n�E�{M�jH���|�j_}���n��f�˽�Q�~�*�u��o�.U��T�#�5M`ӌy{g�Z�-�� Ս�_ymU��ѐpCn/��4�E3s�HU-��"4yc�TՂ˦W~�=��ۭ����}�1b�#�)QV�Od���cј�Ă�ߪ�L?��ф6L;��מ�[�
�v��iAr[�x�,�/Ÿ�[z�r����t�Jb9Dv�Y,�́�����w<��EC$�%��巋�u�\Y̡�碑dwi��b.���&�|�-�1S�zl�W�� m�<L}��FITC�=2�	>#F%K߰N�\��Gt��a �1�Gh���I��%>X���nN�H�8z��ˮ$�~���p5���ᢝ���=��~$��gq7\�N��z�ѳ�1GS�!ܾ]��}�lZl$��l��o4�p�|����F�MK�ɧю���tyq�|�p��.� �ɧ����_y�i��r�œ!��X`���R�r�r�����]/�x���.���]��^�.�D����'WN3�͍��M`ۣ��%�l�pk[���w`�tW��� �?��z�хMw�ѳ/���g׮����J�qssm�.��Pe��Vnzi,���\r��q�AK�uE�&���p�<��;\4i�u����~�ox����n���z��oOÏ���=�K���%�j����_��3[��V�ڏ~a��]$7�-�*�K/gd�/��p!�8�%�~V Ƒ��h'���"|l�8���>K:_nj���q��x񹈙���y��w��O�`@�x���=F���=�ޱ����a�ڎ�{��/>�Ǩ���� ��m]ߋA��E�z#b��Q{m}���q��CR{�ڷ-N�`Ϲ�x��=Dm���A���!���I�u��nS��v}��0H/�I�p�T6hʡ���Vx���N7/�'���ܶ����e�]�%ü$�=��m�97���^^|�*1��4����<W�{y�ˋ*c��y����VrQe�1̧e�q��!�f��$&=$q���A�ш08�Őb[=�������/#��5��\//�=D�/��Л�>@t"&���5�� ڮ��0N>����@$��(�ϴ���M�suQ��1��\�1����������øT_1.>e��p�]���Q8� P��A�"J��^�^�ݨ�OY�?����/7Ll����Ww�҂tN��A�
]V�h�uj�tlz)L5�A����H�\�X)0ѰQ|���m,��
��]#���%��¤���y��W689@��1�m�D;y)&5j]�`������c�������e�
Q;&_78�I�~JѧUi����.�Q�?9�$�1H}I4(y���;�~^��2��V/�iEɦ� m�>�s�Fv�8��5�?x ���OK�b�uh�,g��y�ׇ���:���a��� �mnZw��0T>����0к�φ�ZS�_@կ�@�F>g�U绱�F#��Z�����.B���yz}I�����g^Ҽ�����חt���=�u���[0�$�.�z���7�����8kd�1���t����1���v�u�o�D�Ps){s��y��n7hJ�\�ޜA|^k��.L�Q�8�~� h���B�S�ݼ"�5E�g~�(֎��8���[�˘4���T+F7��~**i�?I��Z��g/��1��{��e��*E����-���vk�����y-��RҮ���!��Ŧ6�N&�aVIO��d�Z�9ee�}��kŤ���1٬Y��-�t�Y�|�V�[1i���r��jjŤ���0+��W5�BI�z�(������A(<S�A`PV��6��a҉Aۜ�	AL�A�.B� a��A����cPx�c� F�<Y���r�����SV��Җ0N]�.��%t�^���Zt
��y*��]�� ��� p�iW(V@��l�0'���5-{%�*���[R��G]��ge�~s��B]3�2�~��h�e�Ke����^�P�̠|�Q<���"dePE:���-3(��E��-3(����%��0q0W�lF������������+�(����n\�[A?@9F������砌6#T f   ]��@=��ƕ�M+�(#�g�E]A=�i���f���z���9(	�zq{�ʨv��[-+�(#>q7���w �>�I_R?�
����\�H-�3�6���?BBi      �   �   x���[
1E��Ÿ	������4�i\�-#� �v��M 9y�檹*��V��dbeo��t�b�h�&�4�bSw'k@cIa����B�k�!p�wa�h�7��Sy\��cNI���c)��a@������w5+d��/@�9�#������{      �      x������ � �      �      x������ � �      �      x������ � �      �   g  x��Xߏ�6~f����K�I���>���Uj՗�)r�I|k0k̶�(�{�N�;���D�	���73�y�ni��zpQ�
m�T-�|:~��A(Xw��?�����eW�6�`ƈx֔��x�IhqZ����ǐ�ϖtq�c��l�URA
�E�̃g"��ޜ��uә0 ����@J,ɲN��� iEԓ��.�aI_I�(EG�Z�,�b�>�0)�ZXwM�u(a�-a�i)xS��is�'IՀF��v�K,���n�����WD���p�q�h�=���E��GG���F�V��EP`!��j�2 7?t=�� �����:|��n>�}8فέ����m�s�]⪓�>L��U���h'�d�N����
�-m$�m줍�:�Z��8�"�2ف�x�ȃ�r}��B$�C�	���p'��n�$hh۽�W��p]��W$�c�.%�s��5���O�CT��\B��lC&'�lڅ�$M����b]b�ҽ�-�����|T����-�T�ӂl9� �JjI��p��A�~�''�IK^:R$��M�S��3�e
ڶSI��ӭ����l�����X~��c�&�ƌnjFֲ_��^t�U��Fθ����s����VX�v 0]�6Ƌ痎K���Zɫ_h�|tV��_II1H[�Z�R]QA 	�ïvx<E�LxD���a���)��r��_W�<[�(������f���k�0
���c��.�iwh�N���?k2��n�0�L&O*�&����;L����:?7��|��zW���^�5s1,G�	
*2|�Ÿ/}�T:�x-�x^�Dij����{*WCk�������A��6JbP~H��lH�]�9����,2m���� �4��������o��#�
���e�����50�͙4n�3�7�z��Cͫ������w�[h����{oG>3�.S�����\��%1(7�*O.K�x?#�̀4[^�\�L���S�Np߼E���9�	�w\�Pߩ!����Eqp�|DѬW��
��eE䖟�ѥv�{(�!z��	;|&���]?~�����io�8�!����X4      �   �  x��Z�n�]�����s�b�5;���Nw�l.��S�!kI�q��S�!'�HrZ�ll� �U�L�X��(es<�T8�(x�.qm�&�R�l��)\o`�����rs��7���/�����{3��i^g��:�fs�9\����׿n�v�9a8
8z���@����7 @s���L���;!�^��	�(����V%4l�[�C-?���7>M���,���P�{�2G-H���1"�T�Pl������F;�������!_�����M���)E�y�Qq��p�Z�L�6�A�~yL�~�	�9�F�Ή�-	�|�-���;-w���Ǜp�z�݊N��h-����`��>덊�C�1��}@�AzH���>�p�2��+���ג����	"����e��	&j���I�x������?h6Ь�YC�B�%�$;�f���18Z5�r��kw�1I3�@D� I�)&��+�J*�Rq1��+\��nB�)(�ELtb�r�$�b�<�$Ȫ�����w;'k��|�8��
����.�}u��J��t�6�j+�*�笎��-���YGtWz��A7���0�Hz�\��8��io��&�$B��&��4��`����-�S�~O��>(�^�Ei���:�-�����YF�Gn��ڧTtf(�Ƶ놓��	��ZR�0�HN��B�� ��T�� k � � l	8��V}Og3tF�T=ߠs��gHI1�y�H�1���;H�"f
a�2�q=��q����;J�S��D�TyM�����U�Ҝ�l���>|�e�;��LXְ산�b�=��j�-��L�>X���v��3��t�
0P�ƫ��[��,�MINJ�4��׃��Կ�YH'���N���
x��8Xͱ�@��u:u��g��@g�s�F�cEʥԻq���I�4�t�k�EO�t�ut���:I ��,jE��1]5��;�Y�g͟]�?{��?���}Ge)GBV�թ�3�mD�P�z0G�)���&=*�dL�Լ���׮���&'-U~W���w�����Gklu6���&� �`��-��Y�g������Q�ޢ�a�ï���s͕��HN�z���'1�5��l`]˹�w��7=y��}xh���K끇g˰��<��z'�j�D���_e8���l�y���iV6W�Q�<죤���̣˵/�B.X��ʮq�=��n�揹~kl�v��N����T��
������eju�y�vZ��`��Cá���[0U�g��26����w��/���86�o:SZQ�Q��L�<(p������������;%��8X�Ho��;�\�j��i�J�V���Q�`���9/��m�k�PN=�����~�\H����>��7)Lȝt;���=J�+�������d�~���J���,��T��W���*����"�Ƶk��9N�R)g+�U�u4��H����H^y5��滎`��b��%�$J��z�h�]Za\b��Uzfjg�,�A�6�Æ�x��j<�^A ��ָtS0}׵<�����ߖI�B��)�'Z�����rF0)FQ�2Y�ǧI� a��5vN$�|Ar���f�O�K��\������y(�Z+z�x�P6RѢ�U�(B5��9n�W����zV�N�V?} ���[��#���d�`���"0��cp�+)
�l�4����cmSmܵ��vzжK��M<�h��`?w;'kvA�~�8��R=U��c7M	P�x���iu�ZqH�R��ۍ#%��|ж"%Օ^��op�<�y*��(��%�*��W��h	KMa�U�<� k � ����v��ف�Z�h�[X�qHx�X�$R�%[���̩PҬ�
��DYæ2��}�#ïp�~����}��W���*�=�+i�K�m��Ͷ_�m3���<^����=�Y��ѷ�Q��0>�y�	7�TT��mPk��\�8��dl�W�xC��]琓�N���\ߗ��So�M7��.�4�)��vf��V�G�|a��Vj<������7�g:9�IN�tE�7Brt�2a�u��a��A$�&;�\�a�[���)�!�H�r(���y����bbvg͝5wvA�l�~��Nz����x���T
C�u"w�9�V�R��x:*�R�+.�u06B�c�^�:�������z�.w���f��ӧ�\��6QP}��m��nl&�еvѹj�`c�[� bhlcV�g>����kl���%�[�� 2��ȸ�XX��+����a#p�}C5wڿn����FY3�      �      x������ � �      �      x������ � �      �   �  x��X�R�H}����V��_�&$��C�/��YdIх�|���2�$Ë������>�G�Q�'��P<�dQd��4�ȓ��2v�'���� ��!򎨄��T���LK��B���$ړ�_���[���i���T��~�%�@)&2dX��peM�����L{0F���|�Mi�I�o�*	I.N�4ߙ�y��Sr{�ܽ�f�8Q�'C��d]TM��<^Ƥ'���;�)6Of{�X(�����d��k�ܙ�<��X����1������:oL��f�`���0$�L������4�?m���|��a�����o6E�7��l�2Oa�)F��`G��c��DA�͑p�<=�	7_|�8zBb�uS�����+}G	�Hh�'�,"���M����c�s����Uv�3�<���T8N���ހ��?�j��r�C�����������`�N-/А��1e�Ȋ�iX�hw�h���z^��a`}�]�m��d����t���97ű���E�c�.�c�f0�E�5���X*2u�B]���X�*�2r"%�� F����
╀�Ђp���r�6����]�>��4M
$i�;~�Gb����P���8��z9v�\*&�QN�Fm�۸�l�<Vq���v�6�dU�6vK� �B����?E�	�<�Mm��:,]��b�f`N�i�y$�(D�������-h��P'��]�۟�8�s(�$8�ԧ}���3���$_x�,_Qc�(2@k/�75B4l	]*|�a�.nh����ȑ$��S.��#(MIpب#�����
^IYp� �ބ~H�s��5n��kS%wœ�dʠ-uHp1f�.�Ʀ���^p�v9<��k�����lJ�;:1���i���I@N��(�}ZE�өք�c��
�[o*[6�RHj�%X���v�)�t
�DӀdH�.��VO�S���(�B�p��yW�y�/NM��:P�YC��t�эe��n�L(KcL�u�.�_��n�� �JE+��?�t��*̝����y�҂�̃C�����!r�U�����y��7�!è_e����5�����QM�������+2,N.���I�;O���\�����؞�����9���Ax�볨%���S
�|C}r"6��.��&�Qi	%�j����Kɝ=�z��c��5ld�n ��tsz�(#9i�=�A�?Wn)t�����gQ�G��7Y��~*�����B 4�DR��[1�г5ߝ�7�!w`�� �/��rg�M(��i�� �u���/���݅LɫQ"`Sk�	�/�k��3 \���û��no�����:|��}�J/�_�un-���Iu�{9�\�&���� `<Xˇ�j���ON0���zۤYYD^l����o��U���|�>�����`.	�������4�z5��tx�����ݒ�7����mM)'ڙ��)+P�� ��0��ݳ|�>dv��{�F|���S�|,����N��6��#P1}�`H�a��k��2 A�g'�[��?!\�Fo�(ҩN�}EX��`�x�dU@�62TP��vK�07&�5�Y�������)�N4��`b���~�+.�5��u��TeP���1j֍٥��W�`�j�/NVE�f�`:�>k�WXuE������>WC�      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x���A�0E��QL0Z
kWn�$d(E'Q �z~QT�;���y�u~+�w]}3~ g����>���P(�J�P�LC4�	uEJG�l���+�'˄�_������)��]�ɠ&g���������Z�+�"$���3���5#xtn�o� ��8�Η����_�C�l5����)S�S{b���s�f �_����t�����eVXl� x ]uS      �   �   x�e�M
�0Fדs�I�iӺ��� ����ZK=�7����>xed�{�K���iJ:k�`ŋpj��M��cY�;~t.{��5}�0�@Q�M#R��^&�<� ���\�����*�g�w�*Z����/7hf>c>\O85      �   �  x��S�n�@=7_�9T����?���33M�43l�F��ڄ$��X	�c��=������n�m�,�Ei�C��D� ��I����n�Mr��a� 2x��;� �ր�I��6ʋ���+�8����������2�Wi���k�������s�B�DGigཱུ��w��9�A�]��N�h��b}E������֗�׮G���'��2��.�${]��GY(-�!@J�֡��a%��8����eM
/�nI��>�>����E�tRڧ�bK��1|rpP�^��( m@��a���Dx%�5F_��`A��5�@��rC�b��w�d�KIeٝ޴|�֩a��>0�A����V:���i�>0k���C�Wt)�&����+����s�o�U�p�C��@nYi/6ì��_�v��܆_��(�n_      �   �   x���An� E���T��(��iwYEB�L�������vR��@�����S����@7�!(bl���B-����x��r/ރ�ٗ��MP�=�y%�}!c'�F�?Q�M#��&�,�{Y�v�����(ܴ�y˪~a�<Q��ow��ȿe���Hgir%�b|�1�,F]�y���Ah%;Ao��F�7o��Z	=��&�c���ci��ö����^i�tK1���r	�L�Qo,�,e8^��ފ���[.3      �      x���{��8�'�7�S0��ݸ;c��7�S[{���wz��#�{v"��"$A�l����.wE~�{@|���ʔ�R��IQ�y ���p�d��Iכ�m>1�l��׫�|���Ao��&YffW7��Ƽ����f���\��ϋ�������l>�~v����3�0�O���dM\-��l��WW/�Ï������W��7W�&����o�Shm��-��n~�J�������jm~�ׯ���f�I��՝�]�Ӎ���ș/��G���h}g�M-��{���߮�4�ʖ:_7�q����ϗ��r��e���ez7�آ�񨷱Oz9���AK?=�e�2V�Q��/���4�MV���_Mub����mCZ�����V�����N!>P}%�=/%:�����~�h:�G[��a��O��|y���T�>/SW���?n>���وY�睟w~޽ܼ��BЎ/$՜$���흫�W���ls�X�Z�G�\�&��)��L�M�xX��~j�b?[O�M�hS��ԝ��I�h�gZ.�T�axl�i��~����_G[���w��*nY����,��"��v�\F�x��"ks������?�^><����O����Lߛ�ש�~�)����PQ:����:������v�@t��$»�~@"_vԏ����h�?�Z�����Yr~�c�K�y�q]�����~���
��Ԭ-�����cz8j�2����Q���;��$��,,����7W�j8�m
��i��v�%�|���IZ����t236��W������������[�L'�fSSpZ��K�6����� b�����?�܂�B4����O����ϛ����nV����Of�_~w�����dmiXc2+h�nV�q`.X�4?o@�Y��{����<Y|�/<xy����c_(�m��85ߺ��f��7��r>{�흙N�߼-������}s��������,pzT��&�J�_���u���:Y�B��7o�P�mh�ܗ/����-<�]Xn�A3Nz�:�R#Tۘ�Y�OV��N[�/�0>���I.5b4b	J#�)�t��H�8f"�i������ `'�1
al�l���l]�biVf]�?4V�{f}^!�3&�.
P7���3(�s�p�cU��H��{�����X��Vd}��<N��8�bm[=Ɋ�}��yS�e+�Vhxs�c̢GX��*o0��q�7+�f�psř$R�<���URG:�2b�XNVWoڐ��>4�n��fJ��������Q��h�5.�u)��47�ŋ�{jiV��_�� 7�^+ɞ20w�m�#�c�{jiV�FЮgĴ7�v>��hRڲF�l�[7�p���S�כ��x��!��uZ� q�3��D�I�$��ԑj�n5ZKx�m�[=5V��o���Mԩ�P) ٜ[SS�"�\Gi����$��d1�Q�irl@h��zj���R@;2��@f�
/���؜�M-N��śQ�ތ�^����������#xgi�����L_��RJ<@��&����Bט�'L<��B�vzfR�m�&�lw��o6[��Σo&����2��ܭ׋��o���W�3�V�l��v̠���E��+�_���_�����~��C=]�nzWA�S���d�$O=��+_��U7L]�z&�|Zh}:z���?SL��70{�s���w٪��ے�M��Cf�'��TM�f��4���ym�#���Y>����~����t��k��,��Ϣ3pڵ����0�@����������)͌�._�u�3�G66o;-oW�^�1�����s�ϱ�t�/Y9|`|��|�V�z����pb�&��~�`s�]��~���T+�*��,��g:�"5�Du�N�s�q��'se	"�a;�:�Fl	;|���M^����H��T��y�F�c��� � kw������{�ݡ���jD��\/�l5խ�fvcZ�wr�Mvzj{tm1�5�~r{oV�bU�~b��a�ᵩ��3�Z��9���Lד��G�A>&�?�{�����wW��=9�����4��,����Q��T�dP'�a���i{)Y������P|�ݽX���O�g�Y����������j��4�� =A�E��wM]��K����T���"|D��C϶���d_�mQ��钳�R�z
)�`����&�/�[ɺHw�/��v��<^�g��q_ɠ�(�Ta����+ݭN��N��4��e��fA��#4RƏq@z`P}j�
g_�M�\~0��eZ��XI8
H��7�OK������&��M�L���.jxh>��U;�>YѬ�nJfI@�@������">���)��� ?�����'_�i@�i����k6��W�V�L�n��T� ׫,�4���rP��v����T��jNC
el��%��~� ����zt����^W���.`>��q��b2��r�NKA��v�X�*O�l���n7%�8�ݬ��Xc�8����`H_!�� ����ׂ����*�I֍XH<��.��)�U*������b���~IX+��Gs�mj)6��6�}�K���uIW��Қ���DߥXd�z���aĳ;��i���L��=����d���R*`�}\�6Q��ʦwx<^�e�8`�H����G;|-���C��7����Q�k�T�@����)P�#��~����@1䛟�ð�rp��	�(��o��f}]|%l+�ϯ�� i�`E�I�`�YR���g*ڊ�����p�N��l��[�&ks�\am�T����t�S+�M��쇁�d���${x(&��n�o�j���������\�
x��awg���^��V�J��@��Ku����/Q|������v�^������~��w��t�f�I�Gs�z��u�f+���
4�z�s��7��N&�ɺ�Z�S+���8�x�m`׶t�5�~�<��:�c�+K�|a�|��qb>�n�����
ڴ����D��J��@t�+�3Y}�Rt�C�k[�r���#wU2-�M��:�r�c)C��$x�K�@����_�4�E�SȞ��u�G7�g��7(��zm�)$9�qɾ�J �d9�NxZ��\�X���@>�C~OG�r�UwF]�L(��H�6���9Rx�nJfq�z�z��Bf�"��Q���^;R�<���:@;--<�h|S+ݍ��'3G|�^h��Kx��q:��y><Q>��Cs�c��n�[���uL�)�����JE����U��v>Ö�S��"}J��i^*�����J�N򒳗]�"w���S�T�����a<}�*�/�xL%4G|�nd�ʏ�2Y��K�����8�9��4��s���4b֜��ԅ�8栓�5�v��c�g��8P=��]D�F�4e�CCκ6�1�.KQ���}:B�ꩧ�4"�ٳN5��uBn��%��_E}��0xӞč^Ј��U#�m�W�Z:n���Zj���OO��M�\6J=B$�b(�Es�
Z�)�t����Rʬ_'��Sʧ�� -9(�g#��E�\����,�OF��HFK	���L|6�Ug�����к<|x�L�g1�3�*��$,.&^vo�1��
��y�׺�s\����q��
���i��>iFZ|E�}J�LRҊ��
d�����=T��9���I+z�{��3Ӧ(��8�ϴ}�L����n~�g��C�dڔMvs.>���3mv��א͹�L[+�ӟh�K����4腥��l�K�wS4>�vF��d�]aG�'��m>�v�l��B�pO&ǧ��(�f���ˆ}����mv� �=��p;���]�G=W_6����-h��"A-���,��l�Q����3�bI�1a�R$�(��H'ږ��hB�Hsa��m!���8���E�f���M�,����4QY��JHH5����!��3h[$� tj,��6O3��l������)��44�&#MF�&��/��]^g�߾_�����BxW I������(�	s	a��fBQ���T�@��HSE"bR�Ijd��d�1	�#H�I��1"CJy�Ġ�Ikr�
1ȸ��m�겍HC�m#�mD��Ɠ�u�t:�     Ј�h��I""�cє�n4eF�pB��=�T���{3�d� e1,�^V9Q�`X��'<c��(�I�r�n?��w�ڋl{�m/J����ޓ5u��;b���]�B$$yĈ�U��d�D$M��X"4kJ X�q���_2�!�:)IY�"�Y��:�H�׈ر�ou�Fdۈl0����m<USgM����]�(�`a�g�f�P�T�H )���D�Fh�EHs�3������D�]��PpJ�5���d��B����6�&"MD�&�����i��6����vy�yӲ]��^]|�E~Wc<����Iڴ����>��v�`>F�Y�a*��|���c��cl����=��16�P>ƶ�� ��Π �n������!"0��w4�π�Ε��'�GI܊�,��;��S�\���:����%qE�Ep.[������c��B6�h�)LH����;V��g�k{+ڎ4k�2�3��a*�0X�(a1�0�MH� f(VA��p�5����{�0D�&�T�"��,���i^��$����羗r�9Vy��������$�0tl(ƒ��art:a+v'À�<�*��8��H �Ju�L�'9���G�N�Cx0]��V�U-&j.C�\}�M>~�㏳��?-�)�����:3�r3�A���ܬB�����da>_�������>L����:���V�#�Rs����lV����I���ݤ(1�Mz7�O��>_L쎤;�LMxoVw�fM]�֑W�`�*�+37��֊.����|�e��M�ۛl��~����# �7�:'��H�v`�#1x��B;�~���l~x��j�\�`�\�����UL;?:��<���*�E�q�đ%i%���un"-�<�8�9�pK�n����uR������d ���o�T�T1~��I�}#(O�U2�T���Z���֢Z�lk�r ���S]���^jǠ�N�]"�0�y��DF�`�&�a��!��gM�p�.�b$�!��T��T��'��$�9�/�SQ�`�&&X��i�5	���8,�q���H�q�2�B�0�O�JYFu6����k!�-D��(����ey�4:M� �N�:A�$ˈ���`�%�.!�L9�2��q�K�1
�1�S��8���F�$STp�K��A6�-�뚈l�m"�MD�&�����i��6�4\��s^���z�����>������V��>��<����p5��	�����d}�6 +& ^�����m�� ס��G�n&�l��W �+~���=�ġ�1��((d�9=ܳ�1K��:f���~l��186�A!`P�n>����$w�6�E,���Gg����H]��͊|t֋�A}�'i��C l60%"��<�#*0���n��&(aT�qs�҂�wKp�%����86�$��Հ'��Z���O
�E���$�w.+���t��m�%���ߛe�=-�e�|�,��<d����<��Bw!dXgֿH�N�N��&$#� ��,J$S�83�H�Z%G �*��,�\G�����"��r��T��P�!5���)l�����7�U:�
�o��=�Z�+���
��Æ�[?��[���r҄0�v�T�X�$�FZ�le���+�e�cah���qv)t:�@��:�*w'�D�h�A'G��F�ci�ry��*�N��  96p�8=����z�9�lx��RЊ�tw���Nl�����÷䝺ǰ ��5x}K4sؿq��>x������_�o7� �3�?����$�;�<����	p:��g�H�u���{�D'j8��Pt�W���@�(w�R�B0ûg')��*ڭ��gv�	��<������ռ���}8F!��=giE�V��E�Rl�Wi�)�ЪS��ǅ�����9���kb�ËSD���w��Ǖ��xr�$�H�����jo��v�5�eGD]�[X��!|�:��S!`��ZT����@��9���S�HT���(���P�;"x�Hx�D�HuU��n���>���X��c��Zi�����8��z8m7s���։�+�3�թ [s���`�N/�Y�pdw²�kH
��8wg# ,�]���kR
]\9eB�'q?@l5z�u�v���;d���OEo{�~����ct��(^v�������`rd�N,T�nڂѓ@��v������	BEvW)��k���7�$���+3�z�n˝&�Ծ��Uŗ��I"Ew%4�la�b~o�> $�2��p������$š�J9NQd�r[�w�e�m#�mD	�5�x�dϙN�3TgGטS�MN	�|��y7��?7�a�K�iܪ,�	Q�w8��w<M�8��gl�y�o����u�F���6ih6ҍf���W��;{ML�Q�@���p��w�����r:�2�﷡M��4����WN �ZuN�d�q;�y�h)#�bCu,EF��F�؞1���Z{.s~s&��H��	�h��֒th|��2�o�H�ygۈh#�m<yC�9��4���R�w���)�����}���웷����1GƯ���|�@���Ur�
�R�;���nezjNҦ�'�_�Wg���Y�o���p�_���׽��*��Y���I�5a$�i."�2[�b -�f"��7I�0/N�)�h
:&��P�����1Y>�/N�&"�Dd��lQ�h���ϗJ���3�cL�B1���)8���(�����gP�*�?����?�t�����{�����e����������>�'����M��Dm|X�o�����g�����y��}���Y�>�q�c&�Q����)_�N���wq����Ԝ�M;n>�эJ(>e��an-���b%�v�&.��O�8���bƇ2�G!Į��{�n���Y��=��a��d����}8F!:�r�����D�,L��y���,D=���z�[����ˇ��±	h���S^�w�z�#����b�Z����������s](o���	$�П��l�{���gM>_�3�:`̞9y��h/�:>5w�YK���ı
����JR�
�{oR����=��Ige�HU\�e�"�sU/��{n�$�$�{QR�W�ZqS�]j¤�(�0�s��|��=[��t�#��K4����^�����d�������<�s�&q[i��V���.�ͳ�t�Q��rXB��s�&���~tF�1��c� %�Ķ��a	�^ύ��M5��T���/��s��m���]=,!6�����8��"�/�qIʩD��&a	�t����i�w�4r��f����a���eW���m�H^sF�M}iݜ�������v]�A;ݴE�m+��F����j��F�A���NW
�LO�w(߽t_���粒-m���LWJPS7�R�<5���_\S�M����ʮ�WW
t�MI�UY��g��u�f�0�t�t>TY��N��up��y��Ɨ�	� �$݀���/#aؘ��9���U���1�Fp��r�>�y��}8F! "txDU���/M�x�Q���*.7���3�qSm�,7�����AҜl��5o�h��	�b��Jx��P	8���-9�3a���>��
~�l-G�L������ yN���h7B�N������j����R�}0�Jcs�z�흺�00�s�Ďm����V#p/fm�̖��.����ѕ}�&�X�9�ͳnV�S��泵nW=]�I𷬛�쵄%=B}=�JЉ�Eb��ؽ�8�mKj���p|�����Q�m-�Y{��I;q�B��z�Sѷ��=9����n6F�!gx$Rz6c��#�2D������Q��8�W�_:z��<�M�>"�ݵz��`�u8���O�_Z;�ݤsr�4�6������nk��ݚ���Em�;�m���E{�E��=U�E}t��z��=�r�^���{*9�:�<�)�2V��=|~��F{�q��T,��G8
�C��G=r����a8�Yѷ��9�LL�cjq/yN���8;S&�&���8'_>D\�uv��X�����\�盫�����hk�    `V,��;��:�����>�N�EΪ47W?~��+�r����ɇBB/חc�j��K�s���e��rC�!���ħ�
�ࢾ�8�e7w+�k�μ�E}��K���v�V�܃��AN��袽�_�U7� �)'�X�������蒿�	��k�T$�j9������nL*��}{���rl�S=������޵��n�1�N�D�����_�7�px���X ��.�S�Y��Ѷe^�_'@���՞���c���ba+���S6zpL�R�%%�_�O�����)Q$��}�{�q�ז��wh�"KE�鲪nO�6�HO�iLwQ����CI9�����J�i,w�W�QK��Pr����^���B>u�2`=d�֢9m/�Y�v��:j�2�ձNݏc� �=����Fh���8f)0ۃf�Z�����ıʀ�.�A�����3j�=�/�9Hϩz�����f/�u��a�9�-�bOץ� ��3�(~5��#��� ���Y�&�ݾ�8Hm�h䛮w�u=g�Q�t4����!�����{/�[�=��s^�G��r����qX���1���Q�v�/٧� ��ý(�����'t�~�D )��Fq��w+dG2�G2�#�d�����=�8Oҙ��#��(L ?���%,����=r���]9�ER/��S,�/�z���V���t:��W2�|�N  &	�@%f:�������~�~�O���>��I��W'nc�s��1�*�������,��.�h�N&��h7��K�L��9U���4@|�g&�W/���1�ZϱT���{��^�)=�6R��z�%�n������kڕ�Ov��=T���y����Z��J��z 2��w��:|�v���>Y���t�x��s�!�2���/�}ݝ��"�I;"�Z���sD��ŒI�d�N ){�q#$OJ�D���:� �l�nD�g�׿��A�=ĕ� V��aq�,��a���9#���ayLTV�%��8'_��l���9��e�l,� iN���
S�\����J^?�8�Ϸb�ٌ�1�D�R-�c��3�{�/D-�J-ٞKŴ��{�,�F=�ٷ����O�Qu@�_̅/��)��i�.W �-��ŚĒd2J��"j��T�iDd� ��'6��H��p[�d�e����$��v��F)��:yp��1�E�qR�0���"��F4��·�\��_1�O԰U��FB��y���T֝ƍ>�s�9f��b$D"bh齰&�n5��5��$�@�諭�GxCDB0#�v�JE��-�8;��뗎��}rT�GVC�X��m����<��V:�Y�����XRlH��O����0��U�����?̭�j�k��b(F�1�A��B'\�  ��{Ģ^��!ѷ�Yo�x���+=f�=��A#�?'�YD��<\o��/�г5��u�hC��\o�x���Hu�)�F��{r\\�=+��̑Ka{O�}G⁽9�!d�=���Q?}՘�eGA�b��S���C�� 0�����u���s�c �X��H��	J2�,�U�E��4JELB2�Qcf�6'���s�q��qH�d���M=n��Ku�� (��N¢0~o�{�n�pr�	��+�o(���:F�o��I��W؛��w" ��f'�Qܵ��X|��5a�-��/^J ���V|u%/xy �J��6|�$/ty dJ���|��c�h܎پ�%j`{>�-2g3~߂���b'��#�I�&1�h�,�:ҙ�ØŊp°��j̻�Pv;+QYv?����=��U���e�Z}�/�s��66O[rO8�b�̬��d��\����?�^�ߦz�nSE�f�oW���=TҲ�M�-� �綳��&�\G,eqDY�"M�L�	0�ƙ,p�3��)�4݂ͦG7�qM(���b{��m���#����B��D�7Sk��/F� ��'�`\UЛ��-;�j���^K](���ba4�xi-�;so����'�ɻ;~S�������^1b�����Y.��U���g������S�Զ�'7�m�!�,x������GG��|����R��k0�d�K�k��|7�)SЗ���F�m�~h?��ӵUNن����y3�}l�%;�)�k�L��8]�)���ҿe�6�,���o���u?��RV�z��t�0�b䙏��v���B�o/��r%��avkmb��k[/E����J���'ڂc�Y���g�a;rd\������:'a
�$�Æ�ݠ�|�;D��,(�[���=q�쥖�\�#0�(��Rp�]����D��J͸� m�*@Y}+�����,��te氅[�"r�ZA��y�jo����&��cF�VD!#��ױ�s`��ѳb`�Q*�2�m5=5�nh���!�N�j4�;��R0"��&�D8�EDQ� `I�HK��ȩNrU��<~���[�Vj�N��`/���<�9HI��1�8�<��-o�YȪ���둰�Ǫ�ͭ�
���*�?�Ԙ/�m�~=�u�mn��Z�����l������1�H
W��0��?M�w�j�p2_���롞ea�Y���:����B� �̲9�g_�o���֊^���V�`M�*;�l������z��y����;�ʍ�{�9xշi�%i%��׹��y$q*sJ����}D��gk�6'eA���DF�G��,��J%BD+������JN�8$�TF�%Y�4��*����6�M"0D�x�L���H�y�q�bk��(��f�~\�9���Y���nnV����U=|97���[�̄˲��m+��N��LV(�^�2��܇0���u��E=���߂����u��>��t�����ڤw3�#�}.��X�x���	�g݅��{�
��#G�V������q�Т��&0"�Ѣ�RLu��G�3�TELj0I�LR���5���DDX�4�)��4e���	՚k�X�0�E1����aĥLDB�T��%B���P,�hr��%0���"�	I$g#�V#��O�Ϗ�ŷ��o�.�2�q��T��а�#�$�18Yf�X�<�q�P_F�α��ls�h)#�bCu|�t�eV�<��O~���g��>���ϳ�=��D��x�e�f��Lg����a耄�`8F�D���7��D�k���{�=!�iz�靦w��iz��
�fl�bT�b�Ә�G��2`"5ˈ�X�4�Y@_j���������ya7�<Jy:J��+E:�#��G:��hi-�]�Ɉ�f��K�����;<���{��s�!�ذ:(�İ@��EX)�I&�g 4�-ura��OX?a/f�"�T<R9�"��������z�Dx�A�Dxq1 ��0p@�r9m$b
e2,�#��L�HP���������}Q��� ��� ;ӷ���������;�)I@q�<% B�:�b�]&��Ix�Q̤a�&��+�u�I��յP~���s�s��>h�A��zs6����<����.ϻ<�����r���*���{��e�/7>i1>�У�j��42X��
�TdJ"KI2*�"��պ �Ug��_��Ua��i�t�c�"*�v���"�Dt��ȵt^9g��r����;x
�#�	�e��P��0��*O��O��5����ϋ�������w~��y���'��)����15�_Y�B|U�$��⒘���t�S�U��B]��=@\Q;?������O3��ͳO3�����roȽ!���������(��M�)e"���&���HR��A2��z{������_����ϛ>o����M���pQ��n�ׁ�Y����m/K�B��7�0S ��2P���2���"䩱��^�3��l��ۤ����*���m�o�/Lq�z���BE��KS�@�)�])�Y�n�H(B��&I1�(bR�t�}��kc�f���	�[q��l�m J�����S�|�:-(��\m�^CÏ���$m�]@�f 
��z3�h�7y�֗�6���G�DF��z�^�VG�E;�Ցwof�ݣ�HJ �DP    �d�G*̐�q��84�^���(#��w��԰��D]�5R�'i�]�10�;���:�ܓ�Y1X�����zN�0��WP���Iq����d6����]�0m�Y5����A��;3]��ɽ��f�t>��s�L7۫�i|�Y�j���e��na�瓕[�O��Ts� �=�ݍ�C�&<�����Qa���2%�ey��$� ���MP¨Jc3v��5~Ԍ5�-0���cM��G�Iڴf�`��5�;���:����Y1�:CF�A�� 'i�1B�Q��Q��T���g`[¿.u��,�������V���w.U��-�˖
+sg4�+ ��la$��7�jj�b�f�U��� V�g=�����kK�YF`��T��:��w�!���X�C�<�J�ƞ�J��ꨜ�H��G�1�F��k
�O7E$v-�:�;8J��|V4Fh�yP�#�u�6+F  e� T���r�6+F0"�I;_�o��!����ǒ7g��������n�^�A��o��*��A5�	1�`5�dfy[��
�i��<8�D�)����L)!�B�֠r9�?�O�o&�{�=����:�C�[��	51z5��[N΀'!@�U��Y3�yq�P f��"�3�Ҕ�7J=�	T1uMw�}�Q�珦/h�|���a�&]����6F-E�/8����[n��k��,�X�l����i���Ge_���7�2/�
JŎJ�����Q	�~�޼�����8Ơ8Ǝ�'us�X:8�����c6��<f��c6��<f��a6��cL��=�V$Q� B"D�hn^���'�ͣ6��<j�ͣ6��<j{��ͣ�r<��(ǣ�r<��(畢�?�H��8p�������t]�C-1���Q����ls1A�JDb��L�ϡ����s�*E-ݗ����K�mw�8`��)SI�Ay�5x#
-�{�y�1�Ә�$U��~p������鍏~WUMo���SEi�r�򶤁���X�m������@~��3�r��	/�'H�\�F}Y��׎a@��h�)�4'�0���\3i]�����چBX
�%k�^
�r\�W�QT�������kE�JQUj*�Q۹5f"9~���Dc07��i�{ b5�-�p[-�ͅX,nO�D��	@��"�\[���֓{�$���l
���w�ef�~�4��w6N�����YٜH������~V�H-��?�m3�"P[~�:��C萖1�ڬօ_7N{�ר�U��
웖k��S��_��te�3�=�/�~թ ����	�U�c�s���5D�M��g&J�Ha�̞�����f.�Y�N?+�d������7W�����#U ��g��jH���WƲ-u6�_5F�l3���j(0���D�Z���N�?s�,�7k����������wKê�|���~ ʘ/����m�[�6��?�q}g�� �j�T?�V���uq]���X�hP�\x�\�7��d1cqg����hT^��I
^*z�:~ڡ����d;;�mOk=|��KH���y*�Ṍ8O`��G2�9�^p(�H4�"h���_�r��1~9���1�/���S-���c^�V��Zz(硜�r�y(硜�r�y(wnPΝ��l�D�4Gl���'�8�>D��*Ό1~���r�y,籜�r�y,�:��G9�x��Q�G9�x��Q�+E9��%���tc��$�����*�#)H�D��eƈ���T/��u@��5S�?~I�,�<���=�:��<�� �/	����c:��<���c:��<����0�;����v�W�TJ�B$�'d�H&�&\�2&���r�y,籜�r�y,�:��G9�x��Q�G9�x��Q�+E9vW��媮��/�|��SXJ�b�v H�m���m��bc��)�wx1�c�[ֿ#q�QG���/C�-�l�iv5\���X��w�V_/���G��!���|,ɮ������r2� C> C�4�C�{$�{ث�n�\����q]"�,��jĖ�Vzp�b�M�4K���f󵩧�,�����fb�l���-盅��#X�Loe����U��@ԇH�Ki�N�=�����W�tz9x��k�F�*�ۅ')a�x� 4 ���Dǉ��k����a��ߥ�s>��s��<��y����9�����zw�ݭw���zw����]�ooN
��p��t��e��FJ�8�4��d�1�U}�r���.׻\�r������;#3���;�/��cR1�p�H\�>�󧰒�૵t��~��
�2�
U��bJc!�6`�5�d�:��S,�ؼ=��ײ��`��ög�6�a��m>m�*�����zo뽭����zo��ErF*�v�����$Ƒ E��6"R2�\p�\����w���z��]�w�_��zg䝑wF�yg�їwFv���h ��^�E����?��x%��6ċ.��󧐰b��"0�(�&�~RX�U@lI��|:Im�:ɥF�F,A�N4�NU	�L�0i�����؞�F��Ĳ�&��H�{�Z ��mr���9�9��e�V�8c)��2�8 S�S1"��6��,��dm~��H�`uc���o���V����3˫��rcF�8�-�s��;������j�V��^�\1���۬��E4�f�n�����q'�T@%v[���r@�(C � 
)�2Ť��y<vQ�B��X�ǟ#��Bd��܇���G~i�X�<z��ͣ7��<�=	/ w��"�`�q�2�0`[f"JLГbPBu��_W�V�[Eo�ZEo/�����ۋ���:���H��R%J)
"�	��(����9Nr��G��S�� �k2O����~,�������`��6Ԕy� �,B(�#�r����b��Ԟ����+�^�_��-�+���[c�4�L�4	j �F
!�ԀyH�of��)ߟ���
�v��dm����O�~�~���8I��ie�눒<����Q.MI�>Wz���i�;
���c�(�����X�{�W�u�=��4��{ /,�H�#9��<��H�#9��<��H�R���所*R.)�Iʱ�k,
�S%HSУ@�q�A��r�y,籜�r�y,�ܫ�r�x��Q�G9�x��Q�G9��e���T�X�C9���M2�n7�ե<��Ǌ���2��Q��x�c;��ѭvzs��@#?�ᥪ�-ÓMV����z���3�M�\OW�$�̬����I�����M�'`��VS�jk6_���,�������UM�[�7��"C��[0�bV�O���+�Z{��S��jѶ�`��9�o7n���~WP�pҶg$`}e{��z�G�!�͛R���Ë��8��1��XU� t��;�EP�MRAc����qρ�f�=|��ΟB��V�Ļ=0��5����j�f�g�tk9�;W���Qpɉ�Ȝ�H!�#%O�DqͶ%�N�h9F���K4*�&RDi��BГJ��8�U.���ȍ����>�+ws7�%5r�)�RR[��66�W_,�P5��wq-u-ۯʡW%뼫:�_Dl�qJP<��ыXp0ḱ�3����(1�ɓH�i�	�pb�$�;��T}������-&E0B���z:[�k�bL9C-Fd�K��U}��pr�f+V�R-����a`#U��Ϝ���Yk������Τ�#�����#rJ�4�� g��⥘<���=R,s��Ino�����E�5�`���c�:O۷+W*@2�G2��� ��m�<��r^4����� �0���pm^'K#�)�QDa�i�t3>~{�p;���{oR�9��z��~�ʯV=�,�Å���ԛRoJ�)���X[�9<[n5�������Oo?�n?�e��[oYN`Y��g`G4W����j���)Wq�,�>e��i��u�by:N[���e��˨�a�-W� �G5�QcVo��Og�W������j<�k�r�q�9F�CE`����66p0f�L0D����1�e0�ǧr�[	v�7�n����^��@�nG�9���   �qϟB�oH��ֲ�x�㬁 F��Dƀ�[�3���12�k&�!.�����[�0���W��C]��9jÎ	���l��CL���v{���r8�,�	��+�7L���ZR���7#���A��ol6q3V�-P����:;V��M���V�� �3� �Q(�ё�G� (�M�F\�DQ%b���g`gP���D懼B_�BK3� e���hjVA�d�"	��0�C�G	K!�	։����� )����2�w���k9�43���Y�
���d���!�$WZd��	)c~�thI��+��bw��،ҭ=31��l��mjۿ�����m�6+ۿ}�m�ֵoSW`Ԙ�ڏ��_/����Kv��y�}�Zϗ��O��(��f��<+��j:�~[|bD�[�lؘ�`�,e�����n�o:Y���OҬ�"w�� !5
k���)U��G�<��Y�&e�c�I,i��	��,8�-+Xi��p;	Qۢ2��_g��V� b- �ѡ˟���Z�a�-���M3w�,N��lŊV��N��GY��-e�"M��)Mu�  ��>����9�=3i�w���|�!_�o���]9��aF�G��L��������������;
+�*/~���:]��#�Ym��&-�#��Fu����Wǔӈ��S1�g������u-��rc�G/&���J�.�}ǝ���ZCG-^��)"\�pZ�����#6����N���zroz�j��=��i~ը%�l�SQ�WhԖ��h��<Լ�2�c$��xr��0��Z��VA��� XȩY�g�� v�u�ێ��xO��O5��f�>ݼ)[w����na���b��*(��b>��V�:ɥF�F,AiD5�NU	�L �ϑ���n`�\�V�v�����*�Y��r(��W��ych�0?WҜl��6 [t��At��-	+��ʋ�Ɇ�T�Y2|�Yj��S[&���E�h��mri�4���S��V"u5)�{Ҵ��'ѩ
pt�Q��+E��8��W���0NZ`�eO�"�4��J<�@v4|��ާ��qL��SФ�qtȑ������=���G� ��*�B/cZv��EW
(=z��o�W��Lד��םI?$�_���X��wf�����.l�u�`.7����ǬH�ι"�#
x�����a8���;��k�Ɠ>8�ڇ�T ���S�d*�����������ųE�"�9�J�mO����|b� �'�dh=�?V��ܨu�W �����!�8������H.�@cЃ��C��.����/�ϣeϋV'y��	wX]�EW٬tCT'i��Nho�T��J9a���+�7�{�5�C�O���+d�镂^yڲ���B<�K�<��H�3��/�p׏�9�}�!@~����m�"�#�@ۿ�&��<'\�N�����\�bo�i���;áo�<��w�����E�[�9�]�ʁ��%Q�4F9;f�p+>��C��E�[8wE�ױѫR�hO�V�(�F~�)�/EE.n�Urs��)�A�D{2P�JH�$$�x�'y�c*�^���w���4���a�V�dt��[a'����7v�s��*
bN�{�Y��%�Öd��������%�vr�����9�P�𙩀��N�x���Ѿ��&m�\�m2S�V���J?�9��o*���AM흵w<P��
`d$o�B�8$U���������%���O�\}6ө����1�,6�|��4B�R	fA���.��g�g�苭���ފ�ۡyE�fqBL���#�TiB�(��f��)�e�����V�����
:�W�X�$�FZ�8�,��ײ\�8��9>����V����� �W������>�b��S�N��o����KP� ��`�Y�������R��,�dHϊ��k��n�qt:��c|@��ܹ9�>L��8�d޳R���i���K���?�Mğ�m��������p��ɗX�lp
��q�u�������g��,����yy���nXl����<��2�Gw�o���[|F$99*�cO��{��gN/������pL\�dqyc�n,�mQ<�����\��g�NӼ�}����S�=Ig�w�O�'���?�&��`�i7��c'�HRU1�v�N��ŷz:��?�R����d�^e3��}����P���>L�ϫ)<
�����-���,?�/�ײ�*�t��盷[[�U�U\��"�W�z�C�����ҙ\US�W��즭V�z�/WG�����X�Yd[���L��?�����ِ���Q���gW�U��]�����������R��i��Qg�BW�LR�D�fB��:��탂7�L�U�Ӄ˦<��#6[�>\��5�����j;��l����݊��r�e8O�d2�"����/'&�U���4V���o;���JP���@���g�+����>�����J�x}��>J���my�`̤ܭ�r�*�,b��+TB@%�Q�E\@1��/l5�n�W�f%�+�ȯ:_�:M�}W���*�
W�獙�#�-۶��ɝ!����:�CHU.ѩ�����o�8����v���	������?�:���{�w�j�����nq̝�.���~>���K����,�o�ۻ_>͗�{��~^O�յ��,#���\7+8ߏ��g�-)�"�M���7� ��7HƯ�V�
�@�k�쪽&g'RX�o�ܹ7�ds_L��;���眮hϹ�G����#5H�u���@=i�Z>#`�6���:�)��$�@��u9:�ҐHf�'Jr���C����-�
�l[C�֌����Q�pL����E"&$U<R��!�9�#�H'Lg&J�� ����)�=�*���G���C�^g��Ҷ���6�������4pִY�U��y�����Oa%^�m���C٦���u�l�3�f�DI@X����D*&8IN1MG��>�Y�-�LV�%���>�iX9�ي�P�h5*$N�]��p��V+F L��d5W�Ɯ�H$8�(���+��F��<�J#36�E�D����ٮ=C��h��vy~΋�,`���,,=f�笂�&�n�S%@��"�����SX�"nԊ��Ѕ�W`�՘1�v�T�H�"�rd2d׊�'ܬ5�Y�����"&����'pr�V+F [��&!��gq��f+V ��j��c#����c(���`xL�LB�6��QYԬ��t���,�諬����_����?�a��(���L���Up��YU�Bn�X~,N���x� 
+�B�"�n�8�]� ���\��W�k ���0�۬?�]<1�[7�!����i�y=c��8#��FE��TyF!z� zgI��Z���Ɏ��ՖI�츕�!l ��'����jňi'|� d��b�N�جc�VA����S�^��^u���a!D��iPlp�R�g\E�o˼.^�A�L�dИ�\�>.�Rk�
��?i�����g>�.��J���o�lk}�����eF/;���?���wf��s.���v6�x�O��O�?-a �      �   ]   x��K
�  е���a��v]����HC��Go��"���d#�6ɋ��"0��J����n*�G��6�b���4���	�s�gP-,<̜��N      �   �   x�-��j�@F���Lh�߹9�UM ��jl!�I���4cUHӧ��rv����P��H�ުs�MV_��^��aܨT�L���ٗȖ�q��.���~� �˷�^8�	"p�B,=��Z
�a� &�0;0�xX�0N J0�C���9!�|������Ȁ��f����>�}��I/�4p�@ߜ��K�U��F�#�O8�m^����*�V���Ѳ���
BB�
�
y����8��ӌc���i;�� �&�|�uN8M�      �      x������ � �      �      x������ � �      �   ?   x�K32OLKL1�56�4�5I1I�M2KI�M25ON���r���s&唦r:	�=... �]�      �     x�m��j�@Fד��"�8q��[i�77�i0�h����BW�p����!�I�4U� U&A�
B 3RK�l�+�yv'R����X�g�sQ�?�y]�OE]	o�K�MX�@�N���1U!`>YY�}~�G��<��`:�Lݦ�i;^g��b����7�\\�3��J_&��Jv����G2Μ�)�����PT=N]n{FJ��M~t�P&��O��Y�/d̍��n^W������3����o���vqw�X�      �      x������ � �      �      x������ � �      �      x������ � �      �   �  x�e�ˎ�(��>O�~|;jE��e��2���M��1m,���<}
��$ݑ,��W�W[Ԭn(����;���U�_�)>O>��Yw!�M^��F��׷�p���w��K �I��c���8����ͮ�J�_q�8E6p����$o5�=�1P���"r�F�����<ǀ�	�E�Uǉ��*o^]ow�ES�J ���4cz�i���+����J�P�~8�/S1���푊7~��-��,��e���dʟ����Ȥ�-�{�^�q�)m��)K3ۺG�\AKԄǒ�ϙ}�i"��1�>X9����w#k�7H*MGE�
b�H?@���~��^r�gޖu���/�Y����Gc���h�#�O�ӝ�y�h�K���� �]lB�^�t8�:�q���c�-���N�M1(.y�@u�I,�6t`���aJ!h���V�aCjv�ę�r`]&�����Qa��"����^���nvHT���`�#��H�.��<�'��2?��8D���,S{Y~ݼ�r��3!+�-�+*z��в�v��3-�MZg��4��gg^�]�A����r�K 9�@�B�ӳJ��g��4]�G�&�� 	�
�.�����ޞ��:����k�sX����Ӂ��Ѣ��$I�4l�ӝ�1F��c�1*X7R`h�G�M��B���<�N? .Px�      �   �  x���˵ !�m.�#?�$&����Cz&�ޗro>��M�"d(��b�/�3�7�G[�À����E��y����_2͂���AVN�[�d/;���%��e���I����d�9��KN%�Rc�0�"O���Dd_�O/9r�Y w����q@]����f/H7�&���U{���*��|���IF0�u�n�sc����n�%���I��W�n��}��N����g<�g���#�,r��Pr���oӑ��̔U�Jk���o��=G$������eCh�����{l�\-�#��<�%�"?�G��L���ɓ F�� ]g���mh����,R�OTİ�/���dV�=S��IJ�U䧫��Ԛ���_ �
�+�Y:�d9�{k�F��S��4��[����IO�Nݮ����Z��a�      �      x������ � �      �   D  x�]бn�0��Y~
.�%�D�	�n	�e�,:1���}�8�k�e$m�6�D�O���z9�@���T&��P�FI�f�<QϷ�E6xN��_W�+��u����d�q��.�������g�_�2Y�]6����IE�A�������,�.o�uU�4���>����vi;�k����6�;�?�ܹ/����=����J���I;�=�3�x*�!F�l����t�ki��pN�m���+$�$���|į�<JG�yk��@�������Ƥ)%��%�9x<�.dL�Y�
�XW��6Û�k��w]�wO��      �   e   x���
�0D��32�Tqw�ԡ�P�Ԗ����˽;�n0k�$��(�Ë+)^bN� D�2W�Lx�c�є��v)�1k��5�a'��v��ƹ�b����     