PGDMP  "    )                }            forsale    17.2    17.2 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    25900    forsale    DATABASE     �   CREATE DATABASE forsale WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE forsale;
                     postgres    false                       1259    26769    Contacts    TABLE        CREATE TABLE public."Contacts" (
    id integer NOT NULL,
    date_created timestamp with time zone,
    "firstName" character varying(255),
    "lastName" character varying(255),
    email character varying(255),
    subject character varying(255),
    message character varying(255)
);
    DROP TABLE public."Contacts";
       public         heap r       postgres    false                       1259    26768    Contacts_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Contacts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Contacts_id_seq";
       public               postgres    false    262            �           0    0    Contacts_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Contacts_id_seq" OWNED BY public."Contacts".id;
          public               postgres    false    261                       1259    26704    Other_Images    TABLE     �   CREATE TABLE public."Other_Images" (
    id integer NOT NULL,
    user_created uuid,
    date_created timestamp with time zone,
    banner1_image uuid,
    banner2_image uuid,
    about_us_image uuid
);
 "   DROP TABLE public."Other_Images";
       public         heap r       postgres    false                       1259    26703    Other_Images_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Other_Images_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Other_Images_id_seq";
       public               postgres    false    260            �           0    0    Other_Images_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Other_Images_id_seq" OWNED BY public."Other_Images".id;
          public               postgres    false    259                       1259    26847    cart    TABLE     ~   CREATE TABLE public.cart (
    id uuid NOT NULL,
    date_created timestamp with time zone,
    "totalPrice" numeric(10,5)
);
    DROP TABLE public.cart;
       public         heap r       postgres    false                       1259    26785 
   cart_items    TABLE     �   CREATE TABLE public.cart_items (
    id integer NOT NULL,
    date_created timestamp with time zone,
    quantity integer,
    price real,
    product integer,
    cart uuid NOT NULL
);
    DROP TABLE public.cart_items;
       public         heap r       postgres    false                       1259    26784    cart_items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.cart_items_id_seq;
       public               postgres    false    264            �           0    0    cart_items_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;
          public               postgres    false    263            �            1259    26531    directus_access    TABLE     �   CREATE TABLE public.directus_access (
    id uuid NOT NULL,
    role uuid,
    "user" uuid,
    policy uuid NOT NULL,
    sort integer
);
 #   DROP TABLE public.directus_access;
       public         heap r       postgres    false            �            1259    25963    directus_activity    TABLE     {  CREATE TABLE public.directus_activity (
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
       public         heap r       postgres    false            �            1259    25962    directus_activity_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.directus_activity_id_seq;
       public               postgres    false    223            �           0    0    directus_activity_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.directus_activity_id_seq OWNED BY public.directus_activity.id;
          public               postgres    false    222            �            1259    25901    directus_collections    TABLE     o  CREATE TABLE public.directus_collections (
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
       public         heap r       postgres    false            �            1259    26555    directus_comments    TABLE     l  CREATE TABLE public.directus_comments (
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
       public         heap r       postgres    false            �            1259    26278    directus_dashboards    TABLE     I  CREATE TABLE public.directus_dashboards (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(64) DEFAULT 'dashboard'::character varying NOT NULL,
    note text,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    color character varying(255)
);
 '   DROP TABLE public.directus_dashboards;
       public         heap r       postgres    false            �            1259    26487    directus_extensions    TABLE     �   CREATE TABLE public.directus_extensions (
    enabled boolean DEFAULT true NOT NULL,
    id uuid NOT NULL,
    folder character varying(255) NOT NULL,
    source character varying(255) NOT NULL,
    bundle uuid
);
 '   DROP TABLE public.directus_extensions;
       public         heap r       postgres    false            �            1259    25940    directus_fields    TABLE     �  CREATE TABLE public.directus_fields (
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
       public         heap r       postgres    false            �            1259    25939    directus_fields_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_fields_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.directus_fields_id_seq;
       public               postgres    false    221            �           0    0    directus_fields_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.directus_fields_id_seq OWNED BY public.directus_fields.id;
          public               postgres    false    220            �            1259    25987    directus_files    TABLE     [  CREATE TABLE public.directus_files (
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
       public         heap r       postgres    false            �            1259    26392    directus_flows    TABLE       CREATE TABLE public.directus_flows (
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
       public         heap r       postgres    false            �            1259    25977    directus_folders    TABLE     z   CREATE TABLE public.directus_folders (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    parent uuid
);
 $   DROP TABLE public.directus_folders;
       public         heap r       postgres    false            �            1259    26151    directus_migrations    TABLE     �   CREATE TABLE public.directus_migrations (
    version character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
 '   DROP TABLE public.directus_migrations;
       public         heap r       postgres    false            �            1259    26338    directus_notifications    TABLE     �  CREATE TABLE public.directus_notifications (
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
       public         heap r       postgres    false            �            1259    26337    directus_notifications_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.directus_notifications_id_seq;
       public               postgres    false    243            �           0    0    directus_notifications_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.directus_notifications_id_seq OWNED BY public.directus_notifications.id;
          public               postgres    false    242            �            1259    26409    directus_operations    TABLE     �  CREATE TABLE public.directus_operations (
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
       public         heap r       postgres    false            �            1259    26292    directus_panels    TABLE     /  CREATE TABLE public.directus_panels (
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
       public         heap r       postgres    false            �            1259    26013    directus_permissions    TABLE       CREATE TABLE public.directus_permissions (
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
       public         heap r       postgres    false            �            1259    26012    directus_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.directus_permissions_id_seq;
       public               postgres    false    227            �           0    0    directus_permissions_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.directus_permissions_id_seq OWNED BY public.directus_permissions.id;
          public               postgres    false    226            �            1259    26510    directus_policies    TABLE     p  CREATE TABLE public.directus_policies (
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
       public         heap r       postgres    false            �            1259    26032    directus_presets    TABLE     �  CREATE TABLE public.directus_presets (
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
       public         heap r       postgres    false            �            1259    26031    directus_presets_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_presets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.directus_presets_id_seq;
       public               postgres    false    229            �           0    0    directus_presets_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.directus_presets_id_seq OWNED BY public.directus_presets.id;
          public               postgres    false    228            �            1259    26057    directus_relations    TABLE     �  CREATE TABLE public.directus_relations (
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
       public         heap r       postgres    false            �            1259    26056    directus_relations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_relations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.directus_relations_id_seq;
       public               postgres    false    231            �           0    0    directus_relations_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.directus_relations_id_seq OWNED BY public.directus_relations.id;
          public               postgres    false    230            �            1259    26076    directus_revisions    TABLE       CREATE TABLE public.directus_revisions (
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
       public         heap r       postgres    false            �            1259    26075    directus_revisions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_revisions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.directus_revisions_id_seq;
       public               postgres    false    233            �           0    0    directus_revisions_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.directus_revisions_id_seq OWNED BY public.directus_revisions.id;
          public               postgres    false    232            �            1259    25911    directus_roles    TABLE     �   CREATE TABLE public.directus_roles (
    id uuid NOT NULL,
    name character varying(100) NOT NULL,
    icon character varying(64) DEFAULT 'supervised_user_circle'::character varying NOT NULL,
    description text,
    parent uuid
);
 "   DROP TABLE public.directus_roles;
       public         heap r       postgres    false            �            1259    26099    directus_sessions    TABLE     !  CREATE TABLE public.directus_sessions (
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
       public         heap r       postgres    false            �            1259    26112    directus_settings    TABLE     �  CREATE TABLE public.directus_settings (
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
       public         heap r       postgres    false            �            1259    26111    directus_settings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.directus_settings_id_seq;
       public               postgres    false    236            �           0    0    directus_settings_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.directus_settings_id_seq OWNED BY public.directus_settings.id;
          public               postgres    false    235            �            1259    26358    directus_shares    TABLE     �  CREATE TABLE public.directus_shares (
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
       public         heap r       postgres    false            �            1259    26443    directus_translations    TABLE     �   CREATE TABLE public.directus_translations (
    id uuid NOT NULL,
    language character varying(255) NOT NULL,
    key character varying(255) NOT NULL,
    value text NOT NULL
);
 )   DROP TABLE public.directus_translations;
       public         heap r       postgres    false            �            1259    25922    directus_users    TABLE       CREATE TABLE public.directus_users (
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
       public         heap r       postgres    false            �            1259    26450    directus_versions    TABLE     �  CREATE TABLE public.directus_versions (
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
       public         heap r       postgres    false            �            1259    26140    directus_webhooks    TABLE     $  CREATE TABLE public.directus_webhooks (
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
       public         heap r       postgres    false            �            1259    26139    directus_webhooks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.directus_webhooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.directus_webhooks_id_seq;
       public               postgres    false    238            �           0    0    directus_webhooks_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.directus_webhooks_id_seq OWNED BY public.directus_webhooks.id;
          public               postgres    false    237                       1259    26812    orders    TABLE     �   CREATE TABLE public.orders (
    id uuid NOT NULL,
    date_created timestamp with time zone,
    payment_method character varying(255),
    total_price numeric(10,5),
    cart uuid,
    shipping integer
);
    DROP TABLE public.orders;
       public         heap r       postgres    false            �            1259    26576    products    TABLE     �   CREATE TABLE public.products (
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
       public         heap r       postgres    false                        1259    26597    products_files    TABLE     u   CREATE TABLE public.products_files (
    id integer NOT NULL,
    products_id integer,
    directus_files_id uuid
);
 "   DROP TABLE public.products_files;
       public         heap r       postgres    false            �            1259    26596    products_files_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.products_files_id_seq;
       public               postgres    false    256            �           0    0    products_files_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.products_files_id_seq OWNED BY public.products_files.id;
          public               postgres    false    255            �            1259    26575    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public               postgres    false    254            �           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public               postgres    false    253            
           1259    26804    shipping    TABLE     f  CREATE TABLE public.shipping (
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
       public         heap r       postgres    false            	           1259    26803    shipping_id_seq    SEQUENCE     �   CREATE SEQUENCE public.shipping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.shipping_id_seq;
       public               postgres    false    266            �           0    0    shipping_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.shipping_id_seq OWNED BY public.shipping.id;
          public               postgres    false    265                       1259    26614    slider_images    TABLE     �   CREATE TABLE public.slider_images (
    id integer NOT NULL,
    date_created timestamp with time zone,
    user_updated uuid,
    date_updated timestamp with time zone,
    image uuid,
    title text,
    description character varying(255)
);
 !   DROP TABLE public.slider_images;
       public         heap r       postgres    false                       1259    26613    slider_images_id_seq    SEQUENCE     �   CREATE SEQUENCE public.slider_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.slider_images_id_seq;
       public               postgres    false    258            �           0    0    slider_images_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.slider_images_id_seq OWNED BY public.slider_images.id;
          public               postgres    false    257                       1259    27039 
   variations    TABLE     �   CREATE TABLE public.variations (
    id integer NOT NULL,
    title character varying(255),
    "Options" json,
    prices json
);
    DROP TABLE public.variations;
       public         heap r       postgres    false                       1259    27038    variations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.variations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.variations_id_seq;
       public               postgres    false    270            �           0    0    variations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.variations_id_seq OWNED BY public.variations.id;
          public               postgres    false    269            m           2604    26772    Contacts id    DEFAULT     n   ALTER TABLE ONLY public."Contacts" ALTER COLUMN id SET DEFAULT nextval('public."Contacts_id_seq"'::regclass);
 <   ALTER TABLE public."Contacts" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    262    261    262            l           2604    26707    Other_Images id    DEFAULT     v   ALTER TABLE ONLY public."Other_Images" ALTER COLUMN id SET DEFAULT nextval('public."Other_Images_id_seq"'::regclass);
 @   ALTER TABLE public."Other_Images" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    259    260    260            n           2604    26788    cart_items id    DEFAULT     n   ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);
 <   ALTER TABLE public.cart_items ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    264    263    264            6           2604    25966    directus_activity id    DEFAULT     |   ALTER TABLE ONLY public.directus_activity ALTER COLUMN id SET DEFAULT nextval('public.directus_activity_id_seq'::regclass);
 C   ALTER TABLE public.directus_activity ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    223    223            1           2604    25943    directus_fields id    DEFAULT     x   ALTER TABLE ONLY public.directus_fields ALTER COLUMN id SET DEFAULT nextval('public.directus_fields_id_seq'::regclass);
 A   ALTER TABLE public.directus_fields ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    221    221            U           2604    26341    directus_notifications id    DEFAULT     �   ALTER TABLE ONLY public.directus_notifications ALTER COLUMN id SET DEFAULT nextval('public.directus_notifications_id_seq'::regclass);
 H   ALTER TABLE public.directus_notifications ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    242    243    243            :           2604    26016    directus_permissions id    DEFAULT     �   ALTER TABLE ONLY public.directus_permissions ALTER COLUMN id SET DEFAULT nextval('public.directus_permissions_id_seq'::regclass);
 F   ALTER TABLE public.directus_permissions ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    227    226    227            ;           2604    26035    directus_presets id    DEFAULT     z   ALTER TABLE ONLY public.directus_presets ALTER COLUMN id SET DEFAULT nextval('public.directus_presets_id_seq'::regclass);
 B   ALTER TABLE public.directus_presets ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    228    229    229            >           2604    26060    directus_relations id    DEFAULT     ~   ALTER TABLE ONLY public.directus_relations ALTER COLUMN id SET DEFAULT nextval('public.directus_relations_id_seq'::regclass);
 D   ALTER TABLE public.directus_relations ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    231    230    231            @           2604    26079    directus_revisions id    DEFAULT     ~   ALTER TABLE ONLY public.directus_revisions ALTER COLUMN id SET DEFAULT nextval('public.directus_revisions_id_seq'::regclass);
 D   ALTER TABLE public.directus_revisions ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    233    232    233            A           2604    26115    directus_settings id    DEFAULT     |   ALTER TABLE ONLY public.directus_settings ALTER COLUMN id SET DEFAULT nextval('public.directus_settings_id_seq'::regclass);
 C   ALTER TABLE public.directus_settings ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    235    236    236            J           2604    26143    directus_webhooks id    DEFAULT     |   ALTER TABLE ONLY public.directus_webhooks ALTER COLUMN id SET DEFAULT nextval('public.directus_webhooks_id_seq'::regclass);
 C   ALTER TABLE public.directus_webhooks ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    238    237    238            g           2604    26579    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    254    253    254            j           2604    26600    products_files id    DEFAULT     v   ALTER TABLE ONLY public.products_files ALTER COLUMN id SET DEFAULT nextval('public.products_files_id_seq'::regclass);
 @   ALTER TABLE public.products_files ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    255    256    256            o           2604    26807    shipping id    DEFAULT     j   ALTER TABLE ONLY public.shipping ALTER COLUMN id SET DEFAULT nextval('public.shipping_id_seq'::regclass);
 :   ALTER TABLE public.shipping ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    265    266    266            k           2604    26617    slider_images id    DEFAULT     t   ALTER TABLE ONLY public.slider_images ALTER COLUMN id SET DEFAULT nextval('public.slider_images_id_seq'::regclass);
 ?   ALTER TABLE public.slider_images ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    258    257    258            p           2604    27042    variations id    DEFAULT     n   ALTER TABLE ONLY public.variations ALTER COLUMN id SET DEFAULT nextval('public.variations_id_seq'::regclass);
 <   ALTER TABLE public.variations ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    269    270    270            �          0    26769    Contacts 
   TABLE DATA           h   COPY public."Contacts" (id, date_created, "firstName", "lastName", email, subject, message) FROM stdin;
    public               postgres    false    262   u      �          0    26704    Other_Images 
   TABLE DATA           v   COPY public."Other_Images" (id, user_created, date_created, banner1_image, banner2_image, about_us_image) FROM stdin;
    public               postgres    false    260   �u      �          0    26847    cart 
   TABLE DATA           >   COPY public.cart (id, date_created, "totalPrice") FROM stdin;
    public               postgres    false    268   !v      �          0    26785 
   cart_items 
   TABLE DATA           V   COPY public.cart_items (id, date_created, quantity, price, product, cart) FROM stdin;
    public               postgres    false    264   Tw      �          0    26531    directus_access 
   TABLE DATA           I   COPY public.directus_access (id, role, "user", policy, sort) FROM stdin;
    public               postgres    false    251   "y      �          0    25963    directus_activity 
   TABLE DATA           v   COPY public.directus_activity (id, action, "user", "timestamp", ip, user_agent, collection, item, origin) FROM stdin;
    public               postgres    false    223   �y      �          0    25901    directus_collections 
   TABLE DATA           *  COPY public.directus_collections (collection, icon, note, display_template, hidden, singleton, translations, archive_field, archive_app_filter, archive_value, unarchive_value, sort_field, accountability, color, item_duplication_fields, sort, "group", collapse, preview_url, versioning) FROM stdin;
    public               postgres    false    217   0�      �          0    26555    directus_comments 
   TABLE DATA           �   COPY public.directus_comments (id, collection, item, comment, date_created, date_updated, user_created, user_updated) FROM stdin;
    public               postgres    false    252   ݨ      �          0    26278    directus_dashboards 
   TABLE DATA           f   COPY public.directus_dashboards (id, name, icon, note, date_created, user_created, color) FROM stdin;
    public               postgres    false    240   ��      �          0    26487    directus_extensions 
   TABLE DATA           R   COPY public.directus_extensions (enabled, id, folder, source, bundle) FROM stdin;
    public               postgres    false    249   �      �          0    25940    directus_fields 
   TABLE DATA           �   COPY public.directus_fields (id, collection, field, special, interface, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, "group", validation, validation_message) FROM stdin;
    public               postgres    false    221   4�      �          0    25987    directus_files 
   TABLE DATA           6  COPY public.directus_files (id, storage, filename_disk, filename_download, title, type, folder, uploaded_by, created_on, modified_by, modified_on, charset, filesize, width, height, duration, embed, description, location, tags, metadata, focal_point_x, focal_point_y, tus_id, tus_data, uploaded_on) FROM stdin;
    public               postgres    false    225   ��      �          0    26392    directus_flows 
   TABLE DATA           �   COPY public.directus_flows (id, name, icon, color, description, status, trigger, accountability, options, operation, date_created, user_created) FROM stdin;
    public               postgres    false    245   ��      �          0    25977    directus_folders 
   TABLE DATA           <   COPY public.directus_folders (id, name, parent) FROM stdin;
    public               postgres    false    224   ��      �          0    26151    directus_migrations 
   TABLE DATA           I   COPY public.directus_migrations (version, name, "timestamp") FROM stdin;
    public               postgres    false    239   ڶ      �          0    26338    directus_notifications 
   TABLE DATA           �   COPY public.directus_notifications (id, "timestamp", status, recipient, sender, subject, message, collection, item) FROM stdin;
    public               postgres    false    243   x�      �          0    26409    directus_operations 
   TABLE DATA           �   COPY public.directus_operations (id, name, key, type, position_x, position_y, options, resolve, reject, flow, date_created, user_created) FROM stdin;
    public               postgres    false    246   ��      �          0    26292    directus_panels 
   TABLE DATA           �   COPY public.directus_panels (id, dashboard, name, icon, color, show_header, note, type, position_x, position_y, width, height, options, date_created, user_created) FROM stdin;
    public               postgres    false    241   ��      �          0    26013    directus_permissions 
   TABLE DATA           x   COPY public.directus_permissions (id, collection, action, permissions, validation, presets, fields, policy) FROM stdin;
    public               postgres    false    227   Ͻ      �          0    26510    directus_policies 
   TABLE DATA           z   COPY public.directus_policies (id, name, icon, description, ip_access, enforce_tfa, admin_access, app_access) FROM stdin;
    public               postgres    false    250   ��      �          0    26032    directus_presets 
   TABLE DATA           �   COPY public.directus_presets (id, bookmark, "user", role, collection, search, layout, layout_query, layout_options, refresh_interval, filter, icon, color) FROM stdin;
    public               postgres    false    229   \�      �          0    26057    directus_relations 
   TABLE DATA           �   COPY public.directus_relations (id, many_collection, many_field, one_collection, one_field, one_collection_field, one_allowed_collections, junction_field, sort_field, one_deselect_action) FROM stdin;
    public               postgres    false    231   �      �          0    26076    directus_revisions 
   TABLE DATA           j   COPY public.directus_revisions (id, activity, collection, item, data, delta, parent, version) FROM stdin;
    public               postgres    false    233   &�      �          0    25911    directus_roles 
   TABLE DATA           M   COPY public.directus_roles (id, name, icon, description, parent) FROM stdin;
    public               postgres    false    218   F      �          0    26099    directus_sessions 
   TABLE DATA           n   COPY public.directus_sessions (token, "user", expires, ip, user_agent, share, origin, next_token) FROM stdin;
    public               postgres    false    234   �      �          0    26112    directus_settings 
   TABLE DATA           �  COPY public.directus_settings (id, project_name, project_url, project_color, project_logo, public_foreground, public_background, public_note, auth_login_attempts, auth_password_policy, storage_asset_transform, storage_asset_presets, custom_css, storage_default_folder, basemaps, mapbox_key, module_bar, project_descriptor, default_language, custom_aspect_ratios, public_favicon, default_appearance, default_theme_light, theme_light_overrides, default_theme_dark, theme_dark_overrides, report_error_url, report_bug_url, report_feature_url, public_registration, public_registration_verify_email, public_registration_role, public_registration_email_filter) FROM stdin;
    public               postgres    false    236         �          0    26358    directus_shares 
   TABLE DATA           �   COPY public.directus_shares (id, name, collection, item, role, password, user_created, date_created, date_start, date_end, times_used, max_uses) FROM stdin;
    public               postgres    false    244   #      �          0    26443    directus_translations 
   TABLE DATA           I   COPY public.directus_translations (id, language, key, value) FROM stdin;
    public               postgres    false    247   @      �          0    25922    directus_users 
   TABLE DATA           T  COPY public.directus_users (id, first_name, last_name, email, password, location, title, description, tags, avatar, language, tfa_secret, status, role, token, last_access, last_page, provider, external_identifier, auth_data, email_notifications, appearance, theme_dark, theme_light, theme_light_overrides, theme_dark_overrides) FROM stdin;
    public               postgres    false    219   �      �          0    26450    directus_versions 
   TABLE DATA           �   COPY public.directus_versions (id, key, name, collection, item, hash, date_created, date_updated, user_created, user_updated, delta) FROM stdin;
    public               postgres    false    248   �      �          0    26140    directus_webhooks 
   TABLE DATA           �   COPY public.directus_webhooks (id, name, method, url, status, data, actions, collections, headers, was_active_before_deprecation, migrated_flow) FROM stdin;
    public               postgres    false    238   �      �          0    26812    orders 
   TABLE DATA           _   COPY public.orders (id, date_created, payment_method, total_price, cart, shipping) FROM stdin;
    public               postgres    false    267   �      �          0    26576    products 
   TABLE DATA           k   COPY public.products (id, date_created, name, description, rating, image, price, "Variations") FROM stdin;
    public               postgres    false    254   P      �          0    26597    products_files 
   TABLE DATA           L   COPY public.products_files (id, products_id, directus_files_id) FROM stdin;
    public               postgres    false    256         �          0    26804    shipping 
   TABLE DATA           x   COPY public.shipping (id, date_created, "firstName", "lastName", email, address, phone, city, "postalCode") FROM stdin;
    public               postgres    false    266   �      �          0    26614    slider_images 
   TABLE DATA           p   COPY public.slider_images (id, date_created, user_updated, date_updated, image, title, description) FROM stdin;
    public               postgres    false    258   �      �          0    27039 
   variations 
   TABLE DATA           B   COPY public.variations (id, title, "Options", prices) FROM stdin;
    public               postgres    false    270   �      �           0    0    Contacts_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Contacts_id_seq"', 6, true);
          public               postgres    false    261            �           0    0    Other_Images_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Other_Images_id_seq"', 1, true);
          public               postgres    false    259            �           0    0    cart_items_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cart_items_id_seq', 36, true);
          public               postgres    false    263            �           0    0    directus_activity_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.directus_activity_id_seq', 735, true);
          public               postgres    false    222            �           0    0    directus_fields_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.directus_fields_id_seq', 167, true);
          public               postgres    false    220            �           0    0    directus_notifications_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.directus_notifications_id_seq', 1, false);
          public               postgres    false    242            �           0    0    directus_permissions_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.directus_permissions_id_seq', 36, true);
          public               postgres    false    226            �           0    0    directus_presets_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.directus_presets_id_seq', 9, true);
          public               postgres    false    228            �           0    0    directus_relations_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.directus_relations_id_seq', 40, true);
          public               postgres    false    230            �           0    0    directus_revisions_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.directus_revisions_id_seq', 512, true);
          public               postgres    false    232            �           0    0    directus_settings_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.directus_settings_id_seq', 1, false);
          public               postgres    false    235            �           0    0    directus_webhooks_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.directus_webhooks_id_seq', 1, false);
          public               postgres    false    237            �           0    0    products_files_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.products_files_id_seq', 21, true);
          public               postgres    false    255            �           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 10, true);
          public               postgres    false    253            �           0    0    shipping_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.shipping_id_seq', 21, true);
          public               postgres    false    265            �           0    0    slider_images_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.slider_images_id_seq', 5, true);
          public               postgres    false    257            �           0    0    variations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.variations_id_seq', 2, true);
          public               postgres    false    269            �           2606    26774    Contacts Contacts_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Contacts" DROP CONSTRAINT "Contacts_pkey";
       public                 postgres    false    262            �           2606    26709    Other_Images Other_Images_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Other_Images"
    ADD CONSTRAINT "Other_Images_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Other_Images" DROP CONSTRAINT "Other_Images_pkey";
       public                 postgres    false    260            �           2606    26790    cart_items cart_items_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_pkey;
       public                 postgres    false    264            �           2606    26851    cart cart_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public                 postgres    false    268            �           2606    26535 $   directus_access directus_access_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.directus_access DROP CONSTRAINT directus_access_pkey;
       public                 postgres    false    251            �           2606    25971 (   directus_activity directus_activity_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_activity
    ADD CONSTRAINT directus_activity_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.directus_activity DROP CONSTRAINT directus_activity_pkey;
       public                 postgres    false    223            r           2606    25910 .   directus_collections directus_collections_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.directus_collections
    ADD CONSTRAINT directus_collections_pkey PRIMARY KEY (collection);
 X   ALTER TABLE ONLY public.directus_collections DROP CONSTRAINT directus_collections_pkey;
       public                 postgres    false    217            �           2606    26563 (   directus_comments directus_comments_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.directus_comments DROP CONSTRAINT directus_comments_pkey;
       public                 postgres    false    252            �           2606    26286 ,   directus_dashboards directus_dashboards_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.directus_dashboards
    ADD CONSTRAINT directus_dashboards_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.directus_dashboards DROP CONSTRAINT directus_dashboards_pkey;
       public                 postgres    false    240            �           2606    26496 ,   directus_extensions directus_extensions_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.directus_extensions
    ADD CONSTRAINT directus_extensions_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.directus_extensions DROP CONSTRAINT directus_extensions_pkey;
       public                 postgres    false    249            ~           2606    25951 $   directus_fields directus_fields_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.directus_fields
    ADD CONSTRAINT directus_fields_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.directus_fields DROP CONSTRAINT directus_fields_pkey;
       public                 postgres    false    221            �           2606    25996 "   directus_files directus_files_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.directus_files DROP CONSTRAINT directus_files_pkey;
       public                 postgres    false    225            �           2606    26403 .   directus_flows directus_flows_operation_unique 
   CONSTRAINT     n   ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_operation_unique UNIQUE (operation);
 X   ALTER TABLE ONLY public.directus_flows DROP CONSTRAINT directus_flows_operation_unique;
       public                 postgres    false    245            �           2606    26401 "   directus_flows directus_flows_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.directus_flows DROP CONSTRAINT directus_flows_pkey;
       public                 postgres    false    245            �           2606    25981 &   directus_folders directus_folders_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.directus_folders
    ADD CONSTRAINT directus_folders_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.directus_folders DROP CONSTRAINT directus_folders_pkey;
       public                 postgres    false    224            �           2606    26158 ,   directus_migrations directus_migrations_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.directus_migrations
    ADD CONSTRAINT directus_migrations_pkey PRIMARY KEY (version);
 V   ALTER TABLE ONLY public.directus_migrations DROP CONSTRAINT directus_migrations_pkey;
       public                 postgres    false    239            �           2606    26346 2   directus_notifications directus_notifications_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.directus_notifications DROP CONSTRAINT directus_notifications_pkey;
       public                 postgres    false    243            �           2606    26416 ,   directus_operations directus_operations_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_pkey;
       public                 postgres    false    246            �           2606    26425 5   directus_operations directus_operations_reject_unique 
   CONSTRAINT     r   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_reject_unique UNIQUE (reject);
 _   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_reject_unique;
       public                 postgres    false    246            �           2606    26418 6   directus_operations directus_operations_resolve_unique 
   CONSTRAINT     t   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_resolve_unique UNIQUE (resolve);
 `   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_resolve_unique;
       public                 postgres    false    246            �           2606    26301 $   directus_panels directus_panels_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.directus_panels DROP CONSTRAINT directus_panels_pkey;
       public                 postgres    false    241            �           2606    26020 .   directus_permissions directus_permissions_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.directus_permissions
    ADD CONSTRAINT directus_permissions_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.directus_permissions DROP CONSTRAINT directus_permissions_pkey;
       public                 postgres    false    227            �           2606    26520 (   directus_policies directus_policies_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_policies
    ADD CONSTRAINT directus_policies_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.directus_policies DROP CONSTRAINT directus_policies_pkey;
       public                 postgres    false    250            �           2606    26040 &   directus_presets directus_presets_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.directus_presets DROP CONSTRAINT directus_presets_pkey;
       public                 postgres    false    229            �           2606    26064 *   directus_relations directus_relations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.directus_relations
    ADD CONSTRAINT directus_relations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.directus_relations DROP CONSTRAINT directus_relations_pkey;
       public                 postgres    false    231            �           2606    26083 *   directus_revisions directus_revisions_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.directus_revisions DROP CONSTRAINT directus_revisions_pkey;
       public                 postgres    false    233            t           2606    25921 "   directus_roles directus_roles_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.directus_roles
    ADD CONSTRAINT directus_roles_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.directus_roles DROP CONSTRAINT directus_roles_pkey;
       public                 postgres    false    218            �           2606    26105 (   directus_sessions directus_sessions_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_pkey PRIMARY KEY (token);
 R   ALTER TABLE ONLY public.directus_sessions DROP CONSTRAINT directus_sessions_pkey;
       public                 postgres    false    234            �           2606    26123 (   directus_settings directus_settings_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_pkey;
       public                 postgres    false    236            �           2606    26366 $   directus_shares directus_shares_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.directus_shares DROP CONSTRAINT directus_shares_pkey;
       public                 postgres    false    244            �           2606    26449 0   directus_translations directus_translations_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.directus_translations
    ADD CONSTRAINT directus_translations_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.directus_translations DROP CONSTRAINT directus_translations_pkey;
       public                 postgres    false    247            v           2606    26328 *   directus_users directus_users_email_unique 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_email_unique UNIQUE (email);
 T   ALTER TABLE ONLY public.directus_users DROP CONSTRAINT directus_users_email_unique;
       public                 postgres    false    219            x           2606    26326 8   directus_users directus_users_external_identifier_unique 
   CONSTRAINT     �   ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_external_identifier_unique UNIQUE (external_identifier);
 b   ALTER TABLE ONLY public.directus_users DROP CONSTRAINT directus_users_external_identifier_unique;
       public                 postgres    false    219            z           2606    25931 "   directus_users directus_users_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.directus_users DROP CONSTRAINT directus_users_pkey;
       public                 postgres    false    219            |           2606    26336 *   directus_users directus_users_token_unique 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_token_unique UNIQUE (token);
 T   ALTER TABLE ONLY public.directus_users DROP CONSTRAINT directus_users_token_unique;
       public                 postgres    false    219            �           2606    26458 (   directus_versions directus_versions_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.directus_versions DROP CONSTRAINT directus_versions_pkey;
       public                 postgres    false    248            �           2606    26150 (   directus_webhooks directus_webhooks_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.directus_webhooks
    ADD CONSTRAINT directus_webhooks_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.directus_webhooks DROP CONSTRAINT directus_webhooks_pkey;
       public                 postgres    false    238            �           2606    26816    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public                 postgres    false    267            �           2606    26602 "   products_files products_files_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.products_files
    ADD CONSTRAINT products_files_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.products_files DROP CONSTRAINT products_files_pkey;
       public                 postgres    false    256            �           2606    26582    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public                 postgres    false    254            �           2606    26809    shipping shipping_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.shipping
    ADD CONSTRAINT shipping_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.shipping DROP CONSTRAINT shipping_pkey;
       public                 postgres    false    266            �           2606    26620     slider_images slider_images_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.slider_images
    ADD CONSTRAINT slider_images_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.slider_images DROP CONSTRAINT slider_images_pkey;
       public                 postgres    false    258            �           2606    27044    variations variations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.variations
    ADD CONSTRAINT variations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.variations DROP CONSTRAINT variations_pkey;
       public                 postgres    false    270            �           2606    26955 "   cart_items cart_items_cart_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_foreign FOREIGN KEY (cart) REFERENCES public.cart(id) ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_cart_foreign;
       public               postgres    false    264    268    5060            �           2606    26837 %   cart_items cart_items_product_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_foreign FOREIGN KEY (product) REFERENCES public.products(id) ON DELETE SET NULL;
 O   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_product_foreign;
       public               postgres    false    254    264    5044            �           2606    26546 .   directus_access directus_access_policy_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_policy_foreign FOREIGN KEY (policy) REFERENCES public.directus_policies(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.directus_access DROP CONSTRAINT directus_access_policy_foreign;
       public               postgres    false    5038    250    251            �           2606    26536 ,   directus_access directus_access_role_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.directus_access DROP CONSTRAINT directus_access_role_foreign;
       public               postgres    false    4980    218    251            �           2606    26541 ,   directus_access directus_access_user_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.directus_access DROP CONSTRAINT directus_access_user_foreign;
       public               postgres    false    219    251    4986            �           2606    26330 7   directus_collections directus_collections_group_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_collections
    ADD CONSTRAINT directus_collections_group_foreign FOREIGN KEY ("group") REFERENCES public.directus_collections(collection);
 a   ALTER TABLE ONLY public.directus_collections DROP CONSTRAINT directus_collections_group_foreign;
       public               postgres    false    217    217    4978            �           2606    26564 8   directus_comments directus_comments_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 b   ALTER TABLE ONLY public.directus_comments DROP CONSTRAINT directus_comments_user_created_foreign;
       public               postgres    false    219    252    4986            �           2606    26569 8   directus_comments directus_comments_user_updated_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id);
 b   ALTER TABLE ONLY public.directus_comments DROP CONSTRAINT directus_comments_user_updated_foreign;
       public               postgres    false    4986    252    219            �           2606    26287 <   directus_dashboards directus_dashboards_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_dashboards
    ADD CONSTRAINT directus_dashboards_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 f   ALTER TABLE ONLY public.directus_dashboards DROP CONSTRAINT directus_dashboards_user_created_foreign;
       public               postgres    false    219    4986    240            �           2606    26243 ,   directus_files directus_files_folder_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_folder_foreign FOREIGN KEY (folder) REFERENCES public.directus_folders(id) ON DELETE SET NULL;
 V   ALTER TABLE ONLY public.directus_files DROP CONSTRAINT directus_files_folder_foreign;
       public               postgres    false    224    4994    225            �           2606    26174 1   directus_files directus_files_modified_by_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_modified_by_foreign FOREIGN KEY (modified_by) REFERENCES public.directus_users(id);
 [   ALTER TABLE ONLY public.directus_files DROP CONSTRAINT directus_files_modified_by_foreign;
       public               postgres    false    219    4986    225            �           2606    26169 1   directus_files directus_files_uploaded_by_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_uploaded_by_foreign FOREIGN KEY (uploaded_by) REFERENCES public.directus_users(id);
 [   ALTER TABLE ONLY public.directus_files DROP CONSTRAINT directus_files_uploaded_by_foreign;
       public               postgres    false    219    225    4986            �           2606    26404 2   directus_flows directus_flows_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 \   ALTER TABLE ONLY public.directus_flows DROP CONSTRAINT directus_flows_user_created_foreign;
       public               postgres    false    4986    245    219            �           2606    26179 0   directus_folders directus_folders_parent_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_folders
    ADD CONSTRAINT directus_folders_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_folders(id);
 Z   ALTER TABLE ONLY public.directus_folders DROP CONSTRAINT directus_folders_parent_foreign;
       public               postgres    false    224    224    4994            �           2606    26347 ?   directus_notifications directus_notifications_recipient_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_recipient_foreign FOREIGN KEY (recipient) REFERENCES public.directus_users(id) ON DELETE CASCADE;
 i   ALTER TABLE ONLY public.directus_notifications DROP CONSTRAINT directus_notifications_recipient_foreign;
       public               postgres    false    219    243    4986            �           2606    26352 <   directus_notifications directus_notifications_sender_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_sender_foreign FOREIGN KEY (sender) REFERENCES public.directus_users(id);
 f   ALTER TABLE ONLY public.directus_notifications DROP CONSTRAINT directus_notifications_sender_foreign;
       public               postgres    false    243    219    4986            �           2606    26431 4   directus_operations directus_operations_flow_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_flow_foreign FOREIGN KEY (flow) REFERENCES public.directus_flows(id) ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_flow_foreign;
       public               postgres    false    246    245    5024            �           2606    26426 6   directus_operations directus_operations_reject_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_reject_foreign FOREIGN KEY (reject) REFERENCES public.directus_operations(id);
 `   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_reject_foreign;
       public               postgres    false    246    246    5026            �           2606    26419 7   directus_operations directus_operations_resolve_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_resolve_foreign FOREIGN KEY (resolve) REFERENCES public.directus_operations(id);
 a   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_resolve_foreign;
       public               postgres    false    246    5026    246            �           2606    26436 <   directus_operations directus_operations_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 f   ALTER TABLE ONLY public.directus_operations DROP CONSTRAINT directus_operations_user_created_foreign;
       public               postgres    false    4986    219    246            �           2606    26302 1   directus_panels directus_panels_dashboard_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_dashboard_foreign FOREIGN KEY (dashboard) REFERENCES public.directus_dashboards(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.directus_panels DROP CONSTRAINT directus_panels_dashboard_foreign;
       public               postgres    false    5014    241    240            �           2606    26307 4   directus_panels directus_panels_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 ^   ALTER TABLE ONLY public.directus_panels DROP CONSTRAINT directus_panels_user_created_foreign;
       public               postgres    false    4986    219    241            �           2606    26526 8   directus_permissions directus_permissions_policy_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_permissions
    ADD CONSTRAINT directus_permissions_policy_foreign FOREIGN KEY (policy) REFERENCES public.directus_policies(id) ON DELETE CASCADE;
 b   ALTER TABLE ONLY public.directus_permissions DROP CONSTRAINT directus_permissions_policy_foreign;
       public               postgres    false    250    5038    227            �           2606    26258 .   directus_presets directus_presets_role_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.directus_presets DROP CONSTRAINT directus_presets_role_foreign;
       public               postgres    false    218    229    4980            �           2606    26253 .   directus_presets directus_presets_user_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.directus_presets DROP CONSTRAINT directus_presets_user_foreign;
       public               postgres    false    219    4986    229            �           2606    26263 6   directus_revisions directus_revisions_activity_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_activity_foreign FOREIGN KEY (activity) REFERENCES public.directus_activity(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.directus_revisions DROP CONSTRAINT directus_revisions_activity_foreign;
       public               postgres    false    233    4992    223            �           2606    26204 4   directus_revisions directus_revisions_parent_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_revisions(id);
 ^   ALTER TABLE ONLY public.directus_revisions DROP CONSTRAINT directus_revisions_parent_foreign;
       public               postgres    false    233    233    5004            �           2606    26475 5   directus_revisions directus_revisions_version_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_version_foreign FOREIGN KEY (version) REFERENCES public.directus_versions(id) ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.directus_revisions DROP CONSTRAINT directus_revisions_version_foreign;
       public               postgres    false    5034    248    233            �           2606    26521 ,   directus_roles directus_roles_parent_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_roles
    ADD CONSTRAINT directus_roles_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_roles(id);
 V   ALTER TABLE ONLY public.directus_roles DROP CONSTRAINT directus_roles_parent_foreign;
       public               postgres    false    218    4980    218            �           2606    26382 1   directus_sessions directus_sessions_share_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_share_foreign FOREIGN KEY (share) REFERENCES public.directus_shares(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.directus_sessions DROP CONSTRAINT directus_sessions_share_foreign;
       public               postgres    false    234    244    5020            �           2606    26268 0   directus_sessions directus_sessions_user_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.directus_sessions DROP CONSTRAINT directus_sessions_user_foreign;
       public               postgres    false    4986    219    234            �           2606    26214 8   directus_settings directus_settings_project_logo_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_project_logo_foreign FOREIGN KEY (project_logo) REFERENCES public.directus_files(id);
 b   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_project_logo_foreign;
       public               postgres    false    225    4996    236            �           2606    26224 =   directus_settings directus_settings_public_background_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_background_foreign FOREIGN KEY (public_background) REFERENCES public.directus_files(id);
 g   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_public_background_foreign;
       public               postgres    false    236    4996    225            �           2606    26482 :   directus_settings directus_settings_public_favicon_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_favicon_foreign FOREIGN KEY (public_favicon) REFERENCES public.directus_files(id);
 d   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_public_favicon_foreign;
       public               postgres    false    236    4996    225            �           2606    26219 =   directus_settings directus_settings_public_foreground_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_foreground_foreign FOREIGN KEY (public_foreground) REFERENCES public.directus_files(id);
 g   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_public_foreground_foreign;
       public               postgres    false    4996    236    225            �           2606    26505 D   directus_settings directus_settings_public_registration_role_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_registration_role_foreign FOREIGN KEY (public_registration_role) REFERENCES public.directus_roles(id) ON DELETE SET NULL;
 n   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_public_registration_role_foreign;
       public               postgres    false    4980    236    218            �           2606    26318 B   directus_settings directus_settings_storage_default_folder_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_storage_default_folder_foreign FOREIGN KEY (storage_default_folder) REFERENCES public.directus_folders(id) ON DELETE SET NULL;
 l   ALTER TABLE ONLY public.directus_settings DROP CONSTRAINT directus_settings_storage_default_folder_foreign;
       public               postgres    false    224    4994    236            �           2606    26367 2   directus_shares directus_shares_collection_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_collection_foreign FOREIGN KEY (collection) REFERENCES public.directus_collections(collection) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.directus_shares DROP CONSTRAINT directus_shares_collection_foreign;
       public               postgres    false    244    4978    217            �           2606    26372 ,   directus_shares directus_shares_role_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.directus_shares DROP CONSTRAINT directus_shares_role_foreign;
       public               postgres    false    244    218    4980            �           2606    26377 4   directus_shares directus_shares_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 ^   ALTER TABLE ONLY public.directus_shares DROP CONSTRAINT directus_shares_user_created_foreign;
       public               postgres    false    219    244    4986            �           2606    26273 *   directus_users directus_users_role_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE SET NULL;
 T   ALTER TABLE ONLY public.directus_users DROP CONSTRAINT directus_users_role_foreign;
       public               postgres    false    4980    218    219            �           2606    26459 6   directus_versions directus_versions_collection_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_collection_foreign FOREIGN KEY (collection) REFERENCES public.directus_collections(collection) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.directus_versions DROP CONSTRAINT directus_versions_collection_foreign;
       public               postgres    false    217    248    4978            �           2606    26464 8   directus_versions directus_versions_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;
 b   ALTER TABLE ONLY public.directus_versions DROP CONSTRAINT directus_versions_user_created_foreign;
       public               postgres    false    248    4986    219            �           2606    26469 8   directus_versions directus_versions_user_updated_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id);
 b   ALTER TABLE ONLY public.directus_versions DROP CONSTRAINT directus_versions_user_updated_foreign;
       public               postgres    false    248    4986    219            �           2606    26498 9   directus_webhooks directus_webhooks_migrated_flow_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.directus_webhooks
    ADD CONSTRAINT directus_webhooks_migrated_flow_foreign FOREIGN KEY (migrated_flow) REFERENCES public.directus_flows(id) ON DELETE SET NULL;
 c   ALTER TABLE ONLY public.directus_webhooks DROP CONSTRAINT directus_webhooks_migrated_flow_foreign;
       public               postgres    false    238    245    5024            �           2606    26916    orders orders_cart_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_cart_foreign FOREIGN KEY (cart) REFERENCES public.cart(id) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_cart_foreign;
       public               postgres    false    268    267    5060            �           2606    26970    orders orders_shipping_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_shipping_foreign FOREIGN KEY (shipping) REFERENCES public.shipping(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_shipping_foreign;
       public               postgres    false    266    5056    267            �           2606    26725 0   Other_Images other_images_about_us_image_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public."Other_Images"
    ADD CONSTRAINT other_images_about_us_image_foreign FOREIGN KEY (about_us_image) REFERENCES public.directus_files(id) ON DELETE SET NULL;
 \   ALTER TABLE ONLY public."Other_Images" DROP CONSTRAINT other_images_about_us_image_foreign;
       public               postgres    false    4996    225    260            �           2606    26715 /   Other_Images other_images_banner1_image_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public."Other_Images"
    ADD CONSTRAINT other_images_banner1_image_foreign FOREIGN KEY (banner1_image) REFERENCES public.directus_files(id) ON DELETE SET NULL;
 [   ALTER TABLE ONLY public."Other_Images" DROP CONSTRAINT other_images_banner1_image_foreign;
       public               postgres    false    4996    260    225            �           2606    26720 /   Other_Images other_images_banner2_image_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public."Other_Images"
    ADD CONSTRAINT other_images_banner2_image_foreign FOREIGN KEY (banner2_image) REFERENCES public.directus_files(id) ON DELETE SET NULL;
 [   ALTER TABLE ONLY public."Other_Images" DROP CONSTRAINT other_images_banner2_image_foreign;
       public               postgres    false    225    260    4996            �           2606    26710 .   Other_Images other_images_user_created_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public."Other_Images"
    ADD CONSTRAINT other_images_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id);
 Z   ALTER TABLE ONLY public."Other_Images" DROP CONSTRAINT other_images_user_created_foreign;
       public               postgres    false    260    219    4986            �           2606    26603 7   products_files products_files_directus_files_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.products_files
    ADD CONSTRAINT products_files_directus_files_id_foreign FOREIGN KEY (directus_files_id) REFERENCES public.directus_files(id) ON DELETE SET NULL;
 a   ALTER TABLE ONLY public.products_files DROP CONSTRAINT products_files_directus_files_id_foreign;
       public               postgres    false    4996    225    256            �           2606    26608 1   products_files products_files_products_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.products_files
    ADD CONSTRAINT products_files_products_id_foreign FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE SET NULL;
 [   ALTER TABLE ONLY public.products_files DROP CONSTRAINT products_files_products_id_foreign;
       public               postgres    false    256    254    5044            �           2606    26591    products products_image_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_image_foreign FOREIGN KEY (image) REFERENCES public.directus_files(id) ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_image_foreign;
       public               postgres    false    225    4996    254            �           2606    27057 $   products products_variations_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_variations_foreign FOREIGN KEY ("Variations") REFERENCES public.variations(id);
 N   ALTER TABLE ONLY public.products DROP CONSTRAINT products_variations_foreign;
       public               postgres    false    270    254    5062            �           2606    26670 )   slider_images slider_images_image_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.slider_images
    ADD CONSTRAINT slider_images_image_foreign FOREIGN KEY (image) REFERENCES public.directus_files(id) ON DELETE SET NULL;
 S   ALTER TABLE ONLY public.slider_images DROP CONSTRAINT slider_images_image_foreign;
       public               postgres    false    258    225    4996            �           2606    26621 0   slider_images slider_images_user_updated_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.slider_images
    ADD CONSTRAINT slider_images_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id);
 Z   ALTER TABLE ONLY public.slider_images DROP CONSTRAINT slider_images_user_updated_foreign;
       public               postgres    false    219    258    4986            �   y   x���1�0@��9EvT�M�2��!XLiH�X�Z��Qf�/��18r<�(X:&��Gdrb��
W�M@i�����T��� Y�ּ���F�tJ!�@���)��v�en�۩�_�����H�/-      �   �   x���� гV����A�Բ��	�޼VL���A(&$|b��Pf��֕�0��:�?����%�_�r����5DG�Rb���-����}%�GB�s$�uh瑌iOIk�8��ogfb���������w�Z���+	      �   #  x�]�M��!��u�)�}��e6�w�#�e2S�1n}�7f�Y��.�;������!	`9�!lȍ4e�F��$��y��`W=�I�Ib���:����$~КP+%�ӥ�<�K�Z%t�8���G�u-�$��C��oYSe�TFO|�i�l���1p]a��M��v�����ɥ���I�J�O��>�Z���� 7Z�X��L�x����7�D9��R<�+�� ��~��b��<����p��$ʭ�s��J��R�y�<�3�N>�Ξ!C���'T��=�5��x�����Oz�^?LIu>      �   �  x���M��0౳���,ْ��&����p��B�K
�?�ñP��0߃ g�;�q�1۞\t�������8�ף�?�pmK�e�x��I�#�]]Z��=���i颥_,=-tL���E��?@�Pa��`�dng`$��b�E�$��P����\�l#���5�9YZ���Kbk}��i���-b፥H�1�)�g�ϊ�)I�������y�-x�iJ$�h#�ǌ���ar�)�+��b ,j���,���%鹦��-P�Ro��(��^{��4���(�[�'�5L/g�̲�g��/�Z�GT��ؼ)o�6�F�6�{��Z�%,�̞X8-]���E���z~�s!��Ip3��H���8F,Ʋ��_[�½%����?��K3�ȟ�z^l	`<fO�@ϱ�l�H�
%�Thr����5+~����.a��m�~ vco�      �   �   x����0c���  ��	W����K�<���ݡ����iР@��`v��Qz��?s��<cqA�fe�;�p:z�/n<bW*���#d�wv����ٵ��m61jt��Tg<�={�J;��"��d@|	�$c��t��J4��k����2!1�      �      x�ݝ[�$7v�{>E=��e���[̓1X�.�c���B\��K]BW�k�_2"22�:Of�aO��=hzF����.�S}zz����'g�	A:2vb�D7vAX������'-�R�jA�:46��"�'�}#�ԧ??��ǧ���ȇ��������}y��zP���C�|���7���4���������q������������M�}��������_��1�O����ݗ���4>~������������m ?��k��O�C������6Hk��?_���D�j�De���8=�/��j�QA�B�*��:^�!�夞* ��5D^�A������ٮ��P��,����)�����O�~y�� ر۵*���6�AU��5��5 +�}6��U����D�eB������cX��ױ�.��O��������)��jЁ�ፔ��f�.s�i��&ʀ��=��6�0;�PV��J�1m܍�����Z�B7�xJ�������J �_��U��>�/�4�U��!)����l�oe�h��yOiS֓1~�;1��$ �2��AX�)��0�z�F#��0J5�q_�Z�@�������!U�ҭuM�k���m��&��jJ C+u��L�U;h h�k
�l:qj�of���vV�۸Ȍ�SrQ'V+���k
�X_��3l:^���щe�駩�I��;0%��C���5�3�TZ��d�vX�J��ȥ�u�������aa	���
+}J�n����M`���⇡T��֧ӕOX��b�CI/]�����QXĔ��eb�@� �/R<�X MJU��8n�3zJ�2Ey�H�eY�`1�h�j���`5 ]P���31��b��j���`Ѯ��:�*6G�	S�@T;,���x�<=�ӗ�~B�]��޸FB�J�73�Ig�,���)�Y��1�tA����&53�1�tE�Zer�\Fn���P��VXFu��S�P"�6V�S��DPm����ԣ-T'X.������ϟ���D`)h�i�e�9L:���`�I���L�`1�lɂ*��Z���n�,�sNTgXfu��GK�Sg�����`�ђ�����	L<Z���`�ϗ\>��I��_�|)
�&+�L�[p��&�&���U�5���ц�z>6ecǐ#��g`��E��Dg`6i��х��������3�r;��0�+j�F����҆�f���������辰<�2��3�Ns/���]�+��M��B4���C�M�����Q�oK�xʵ��U��\b��<=���h@��s�i��Z�M,�&�rkY,��ɷ*2�Z.�p�����@V�Z��evg�	,l���ۉl޾�6�w\��z ����k,�<2rw�ʚ�cǭ��]	����*z�x5���zɩ�bc���t$a�8������7��%lb#�*��j�UG�O$_�;�F.Y�;7�|3ngn�X�Kd��ʭ:����HF����C���]��E���+X�MO�3�a�e[��E��a�e[��EJ��'똝<��"%��S\z��8`�ۏ�,RP1�<�MoCV�HC�X
z�}�(l��Za�]��6d%�T��M,����U3;j���HD���2�7��"��2�do��E*j����bQ�RE"j���ŋJ��L��f(���%���a��p@��(���-z��R�o�Ѣ��**�rk����R�`=3���2*�2K��l���M�gx��*�nby��V�2���L̶cT3�]-ϰl��jF��噖�"��F�g�ڞ�o׌�\EEvu� �%2��Vچ[�scG.�Q� R5���F�����L�Z�B�Ie�.N�KcE�f`�]���%#���0{�@[�[�� � 0�Ԡ��� g�� a�a�f�B?t�p�4U���O"`�3��� `pi`:�B�.Q@׹]tw��p��/y8f�{3�YX�e�9�0X/R$8D?��w�@��<��S�h{���w�&�	U/�Ax�8����e�Y;�~ec�&V��g�ڵ�W�� ��s���U�t{�3+�GC6VT���8Ϭ��{k?�z��Y�]xᐎ�z�{H��'хyAaӁ�Oz���V�1�my�j8��U�m�ҙ5�$����b7��p	�e88� ��ps較(`�iu̐M���v�u��v��Aw�<�zA�^��:��!}1`��Zk1�<87�I��!�t�S����i��7�虵v�������@Ϭ��W���}E�me�ݔ���n��~fJ�����֖/5z��b��Y��Rti+z��-�A��:�t]�9��z.��]A3�kӯ����㬠7}R0�����Q�A{a�f=N0̂@�}C�����n]��yT��mCWT���xe���c��W2���[��8���`������X��d�ײD�I���LB�.�*΢3 ��``�v�?�Z$gB���K3����tΝX������n�y&�-ϯ���"Wbͥ6�]��;vj�J�o.������_;����5@�<iDl��l�t�5��n������XN��>t~�\���\>�{md�l����\�e��l��aa��"��0;zY����]�a��Q���>^�����߬-V�4�UGZ�e�>Ѣ��#J�#-7Su��+b>�H��r��	����W�rD���lЫ�Y@�01����M���Na@�'��h��d�=H�ϭ'�VZ��� ���J�FT����|ޚz�#=��=}��,F_ST��Z.	�{�)o�-��}XLy��鑖�y�>,�<����˦u�q-�N����#�u-勔��o� �����E?�@��ik�M��A��P��VZF=�+-��b��t���ן���bA�o�C
��آ�V(�`��6��n�E3X�(������H�f���'Z���r�V���P�/Й-k<1Ku�?�r��Wu��\V�ݼl$V/h�Ih<��%�Zn�X4��X-��O��"]��Tl���-���N�%�Do�ڍ1�t�(��F,^��DFy���h�Ah�~�E�`E?�q�a��C[�c�2�9�0r]��18�9g1�1�t� ���N�d����^���r9jՋ`�5cI�Q�VBck����x=�3DD��L4��:a�^v��g=��QR�LáLc#�{Fu��Z�1G�g�w!���~����Zר��_����Z�d�6V���:��eI&MCvz����_�z�2���m$f���m�������\ �E���_L��g\�h=����g/]g�z�� 5Z�AҀ]���3$Ƀ�-�,}f�
e��-�o4NjE��a�"I
�aҪW}�=�Y���<�ۣ_�u��X��6�����cǒ7Z����g�A�e�?�?��["�`ɭ��!�7�utjU�X���-�{���iU"�����-��UI�3?��Nin-�;TI^��y��Ŭ-z�1��n��%�*X�U7�ۣ�˝hE�O*.�Z6 �����k���N�)�U�*P�􏴆O�ҢI�����2�R�RT3�#-��x�E��M�@����N���i�=f��d�����ۭO\'S�􏴵=��~�R�􏴌
Uw�������}��Q�.�RZ�n�]��4��P��WZ��y��6��N�z�i����:�je�e�/v,$ݗ�(49=���f���M@����jY�Ү9t�mA��jZ��\$��������6J�����!�������1 }�GSm���lZ�/��Әj�}@l�V�h�@��>"��빎�� G�gd6]lߥ��B�ic��іۡ�Ӗd�s�0�P.ۉ���ou,�]�<�ฬ�-+S��u6�J�[�ؘ}m�=��n�Z�ȧ{�EOg��-�]��y_�Z�Q��ߧ�F�	�l�@���q�jKv�ɴ˕
���3�oQM�ZH�F._��Y��:��~��Z4%B5�>�r�V�=�Oϟ�v7��-]f%f�J�8n�\�f�,�wt�5�^�%�Ӗ�,X���݄�ht�JT@+]��Vht���+m~��r�T���3+�m�ᦩ�%�;��    Z6��ܢ�.��y�����ܞ=��ݞ3�meL�3ڀ�e���J���*fY����t�g���� �M�EJ�.�;r`c{���W�.�32�>�����׿{����y� �ʷ� ebP(��EH&W�N��&3��A���y��=�t�����5�%ٙ9S.�>��9�s�tg��y�����q�M��Y�����m��\��n��n�|�e�������x�e�ǫ����҂j�;q��^ ;
��������P��6Zf_2^�E
+,�sln����7
��M�	��n�P��X.���nv�_��ܢىP������|�}O7|�*I?m�ln*�h��^�;цڶ}�ޙ#��g�ق6M�V��f�R�V�� ����U��)��2�ҍ�ϰl���%9��+�qp��и��Z�8nw���-�3���]�_@�~��r�5�"ps�B��5�59�����v�F4ʧ�"�i���"����L˦[�x����믏�B��V�簓\���4c!��E+�~G�͂!b���"�r�3���φj{l�l�_���K8x�������h�l,�Ʃ��H#�I�-�v��;����N�I1KnQo���DU�Ҧ@�7��b��b6T���NHܲ�Jb��(ba��ke�ULh/���2N_� �(b9����$���FˁZ.���e�Q�b����ZF-3�"V/h��-z�*b����fu�2Ө"E��2z�e�Q�V�Zf��4��juA�,劚HEl�:�r[Ȩ~��ʲ鶿�!it���l~�yH���fv �N�F�S+�n�j�a��P�ܢ�Ԋ�p��-JO��l26����f䧉�6dK}f�FJ���.�T������D�?]����ql�X�q���i��.�O`7�h�@55^pUڲB��qLI4F��/���O��y⎋	�D[�����8��v}�<(�*��n��/�]9\����R�-�r���N��WN����SZ)�O{
�m�1TC΅V�'�~��S9WZ������Bm��!'�2��c��J}.9���2���Pz@�*���s�<���� 9�t��fÉ^1@@Zf�3z5� �Nw�e�n�[�u��V7��}���ȹ�ך$3�ᢏ(RU+.0��(�!E�j�e�*��"rf)C�lٴ�s�o�DϨwyQ����y�.C�;_h�l����B=Ќ-�Uf�����[�Ė�Z��w�ڽK.ۭ���{�[)4)Lu8_q��s{�^��u�jq���z�mUh���q��.�f�ua׈/�y�!�����.W2���2��ɥ�32����hTH�;?"���yD�h�ґkxgd6w�/��`����͋��h@�ׂl$�3�����#2����)l�]�eD���b3"���(}Ņ��|d�@���D�m���.y-��D?�Q�4Ee1j�q=RRMӗA��U&��3~���9K�^g��x��,��8ĭ2s���ߥYqM��*-;\4��%�,��jwH���KY�Mm����T��r��A�a&K��N��É7L%���Ji�x��2޳�/�e\��\��dް��'�8� ����y_��ʆE�Q�[9�񄒴�]:H����n�T'����Ibt��i�bt��;�hn��
Oe�K~+�΍J��F�\��Zp!6�ۅ�[���˷�@�1{�i�e�����-��v�}��8%]K%Jת�ťv��㇮��ϷRd����0Ͻ��N�q� �7������:�LU����n�oI�Fz2j�И���[2��DUi��\�� z[�C�����l�/����M�gd.��m��X��N�\2o��Fz%���%��.�Q���:"*�FϞ ��j�~@�l|�.��3�D���Y~��FOu�ȵב�od�";!�9þ���^AL#brFL�1z��%�&o��C��Ʊɇ~��(ɨ����)�=���$��'!������$Ӧ��*�c�x��0�E"oE�,��oۗ,��?��I��p�Y�iҨ2�����V���6ػuP�R��W��7�Md��b1�a���q�ʸ�[R�4.߂e���pT�0�7���V���P��W��Kův�q�F;?�N���ُ"��_� �ֲs=��(�B�]X+5�Q'�f-�.����K�ޙ0;6���a��v_�#�h��]R݆��c�E�a��/�lZШ�����^�.DE�m�\K���tn�h����ے�8d\�Y��\{����?O|��?�������?��[1�����%���Ɂ�U�ND)h�A��=���|J���)'x'!�{7e���lZ�Ru"����n�v�|��Z"쾕1{�ʛ����S�]L�B�NS��މ�����8<�^�[%���}JEk`����a�,ي��m�u��0� %RN�k��0��6/��a��^�T�L?���0���i��vbrF��,�Y�.���e��*]M�ix�K���m�P4�����-oI��k`��g�0�'��$��V"�D�NM ��s4�	��fu���f�0��+!��0�^�!m�}�����`�l�<=!�s����3<�?m��o�v��0����ohS$7N���n��9c>��;Y�^LS��A�p;���o�P��b�n��Y�_�<��eW~�k
\�ϔ���N��hL�V[)k_��)�K���\�ߛ�u�R��V�{޽k��e
0�v��ֳ&+e�������-�g	tk2��sL~��K��B�Ī�3�Ĥ��
^J�OZ�eH�|�U�@/~��ʡbågm;	C�\�&)��J��N���t�}�2i7K*�Ǟ��� �@v�����֩��>?��6�ꮢ��_��V��v"�5,����w�ڭ��a�~�`���d��h=��
�R�3�ɖt�RT���ﰁI�p�E�[��V���*��EϜ��3l������}�~�~y<B�73z=���T඿�jf+>�%�i��&�Ѫi���[�p��8%�c��)�}-�~(�������j��==�ӗ�~�n$k,��@B��c�T̒����Q�n��ދ}�ˣtVIi�n�j�o��k����!Z�>�<ڐ�8�R�A��v�E06͛�8NmJs%U:��u4ZM��aX?IWR��<�X�?�mJ�ti�mlm��[��F��ZY�*[_�/�:��6���8���z�w�,&ՙ~�r�&���lt� B���4MW�΍��j[�o��<?-��t�D��Y�VM�F���$��=�����I�r(�*Ʀ�gLHkQM�}��θ(��֢��;;b��־�$V����!Tl�Z�i"`0��i�H���"x��ϓ�=�iB'�cr',�/��~��v�a���,��jH�x����Ө��W�)���~�͠"��v�i5��nz��o��}�{|�T2��1�]蜘{�N�A���+�4<��<A0��#��U�������)�m�mK�1�|N�� л��Aвq�_I�%7Jz[ә�K��)<���D�o^4�HJtņ�+��N��%�ښ$m�ƺI
;��1�X��E���T����ף+ܐc+��&p��J�bc���V��ݓ�5��=[����OiNUTц0{�ͨ��TSh�J��qL2n�a�>�i����"�49�#��D�Y�o���׭�}�ĲQB�<�Yp����y��Y�T�u�$¨�G�u�=ZBXkG�y���&�V���ظ��'Î�#���^�~4Nبg��y�f��cY��/%g�(ǡ v�\/���	q�"���ur��ФWĴ׎X��q~�=l#��v��g�)ˑ���˩.��]�R\'���k��n�2�S1ߎ֡	�!?�<�����!Q��F��hm}7����q��i�&�S�����h�OH?K)�|[W��9���NǴgOC����^u ��ok�F|�`S;bm���G��t��MZOi�~�Ʊ�b�\Z�fD��سW�{��g���Ið����\����B��H���|{X�Fs1,��bw�*�MJ��5'�i[`��O�R�>��67Cl-�[����|y���7�����e�V�� R  �9�b�;+�E.�&��v߮��A�'{�A`�iA$�1�gz�c���B�� �3=�A`��I�mJ����`&kw��J�l�%m���H���z�,�f'L.���˴v�	��;���}�ôUt#�L:��i2tGRE�,w@�E�Nqc�-�K��v(�݉��2*�tpm}Zu���qN����e��;;���u��G�Y���E�w��/8������	�ii��2lܔ~�^�a̓�S���y��biy��w��ҭ��q���}5(�t[+��c�����F�ueZ��|��U[���wX���Ǵ��@��=-�a��ݼRʃ��Y�W�6�����8�����Bc�aN�l 1Gr�q��(5^G��o���84��6�Ƶ�w�F�C|�)��J��I�Q����w��uI
�ڜz��u�[M]�eZ9#q���Ϝr��I�q���N�����g��Y�K�8��o�gI2)q*����Iێ�a(��އ�����Pn��:�q��+j�f��Ϙ��M��a����vM���S�w��Ph�A�Pꣅ���)볣{ �J�x���7��s�x�w���I�F�i��9]�V`�	R�s�[�':g�H.���X�57�R+�g���g�FRj��4֐6�I͢�t\&���Y�6ΐTF?���ӞE��Ҳ�2��olN��H�*c��!��-��Z�O?r���~�?Ugx��F[C�В�M�������o[Cds ep���Q����EP>�"Ԯ�9]���.p�mȩ�u�kT�W�n�&�a2��Bݬ����ܯ, je�е=�h��"�����Z�7Tņ�'�z�6ņ�Է���Oi3B��0�M��ad6��~����ED�\D6�$��H���vC���ۨz�O�6�Ӣ��l����'E�SD�jx�����|n2e��9�aP�׷]��CY%�-z;o|���T+��p�����A_��G���aYAt���,�O�)�b�*�#F����FK��ͨ��ҏ�]W{�p��Q�q�#�\��9}Ĩ}WuDl ��t��F�m��C��c��x�)wC��B���+ �#���8B�3N�!ņ��b�u�/.Y���<��A7�P��ҤC����?�3�OO�?=~~�jӯ�J�\�ǖw���K��7� G�#���n���P�D���o�>G|f�[]j��^Ur�'4���+�;����������˧N��n�[�xs~E7�B�A�g�<���#��*m\4Q퉷���\&����N/_Qf�U-��h}��ʹ�_��/O�'�Db��F��ѻqJa������'z��e˨�JY_A���P��.;�X�p��u�����˲�#��BGb����2zl{G+���??=��˧��C��a{5���n���I���k�}��R���\���ͺ��hc[�t%������ڦ}��M��D���߬�����E��P"[@��?� �^�%z$�Zۄ����{�M�!G.3|������+2�E�]��Hl[G��]��I�;6�Hl	[qc6+צr�Gt,�V��9����hV�j!����k��ރ[��Ս�Y��?�Q:I�l��.[�
�]A�$�N�J�<b���Ln�ܴ�U�H6�󎋥
�,��ظ�(�mcLw9���͏H�Mӿ���[L�Ŝb'�.2,�pT��uvuN��F2�"cG��[p�K����ݷ�e��"ޚYq��[���;���!;뙜��F�N�㡅ֆ��~=�=��x(��M!Q�_9��v��$B.H��h~�[�2.������q�]"	7���گ�~����x�u�]�I�݋7p��߂km�ͧ߃K���[���DhtO�1[psu�4I��~pK�]P��I2���Ĝ���~�M�9ԶE�ע�M�C&\��]]۔�[\4B�%�.,pp;w-�kzWCµ��}9�[\4wC�4[q]���UQ��N��~v�*�ۥZ��p�i�f��;3���n��Ku��W^[��w4$ܐۋ-;�l�̜)RU+.��Mޘ"U���?v���~+���~����	���ר��'�N8��0%B���EPv��,�X�ప��r;���pGu2;�r�ա��T1-HnK����Ws���_.�r\v�."A�#B`wwǢ�+(���6����.�/Y�.?�̯���b%�>��$�;*7sI�9��{w�hэ��Md���4��Md��E�;R����\&���-}�:s��ߣ�?�#��,�@#%�eO��-�}���6�zG&�ѓ�g\v�w���������yGOZ�q?�ѓ�;�c'@Q���I똣)ȉn߮C�>�|6����z6��7z�8G>����N#�b�����@�e���8O>���f�������ٯ<�4�q����O��� ��\B�w�9O|C��.���_<�����L߯�xrk��M"�~�œ+���{�M`ߣ��%���qk;���w`�t���Z���4�v�хM7�ы���gם���nqs/q�.��Pe��V��i,���\r��qc�%ú�C�v�\�I�J�6?��M�r&���a�-��={�'m��/���������ko,l�%�j����_��3[��6��o��`��]$7���*�K�ߢd�/��p!?��%�~Q Ƒ��hg�گ@|�q4���C
�t�+��~D��������1V���k_�?�8��w����ʏ��:����.^}���j01��J\��6����u��?���s� F9�We\�����&���{��ū�fk_.9����^���W���]Ŷ��z�� �gn�i��I�q&�i�� �$&�Rُ*�^'[�;ݼ$J������:4��J��q���k��w�]��:v<{y����`���vK��\�1/���#����c�[�U�q�0�M�1>�a0��g1�1�c?�"LF�ѹ>���	E��@����}�|�aO{yU!j��w���1ɍt�9�F���`�i�1(�U� !�G�~����o
������ꈁ���՗;���Ƶ���q���#�c��>u��q��SA
 5��$�4��4�ߍ��r���l���p�r�t�>,�|s�K!-H����g�>�NY��^�N�g��T�Z�NWF��Z��F�����㼬�c`�W�0�1>��},Q�&v��k'����:m-�9ok0� ��K1�iT�予>x�.V�|���>��.6��1������z�s�>�J3���8�QL:�1�1$�A�k�Aɇ��/�)���!�����N+J6�i�q��w�+��t�i���p�t:>,q��M�a�5�\��Y�����0�:�/�������mh�ŗ�P�T.JDo�@�:��aM1U���rx��ST��N� �i�M� \���K����5��A�Vۏ��y_OcK�����{1�>���%�b�IB]���(�eo.)*k�%�q��SA��,q#��cL���e�:�����Z����n��nД���������֛\���i�<y�I텚���y?F<#j�����S��<=�q����)i l/'zQ��V�F7���>~*&i�����������      �   �   x���[
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
1ȸ��m�겍HC�m#�mD��Ɠ�u�t:�     Ј�h��I""�cє�n4eF�pB��=�T���{3�d� e1,�^V9Q�`X��'<c��(�I�r�n?��w�ڋl{�m/J����ޓ5u��;b���]�B$$yĈ�U��d�D$M��X"4kJ X�q���_2�!�:)IY�"�Y��:�H�׈ر�ou�Fdۈl0����m<USgM����]�(�`a�g�f�P�T�H )���D�Fh�EHs�3������D�]��PpJ�5���d��B����6�&"MD�&�����i��6����vy�yӲ]��^]|�E~Wc<����Iڴ����>��v�`>F�Y�a*��|���c��cl����=��16�P>ƶ�� ��Π �n������!"0��w4�π�Ε��'�GI܊�,��;��S�\���:����%qE�Ep.[������c��B6�hŹ,��RՊ�F��W���&�|���g��Z�sSHYO�wK��p������nnV!|w�nf�0�/�{���~s��{�uZ�z*Ff��k�zJu��>��t���5õI�f�����⋉�bq���	!�7h����������M5��k[��~��D��]�V�WsoK�ۊ�-�x�/WGp�olu��;�Ցn��VG:�~ەC1��������f��������]����~t��y���UF��I� �,I�(��si��ĩ�)̀[ڌw�]'e�li��M@i�6MuH#��y���g0�2�V�P�������mV���Zd[�h-J�=5V�8�K��4��JDF1�r�H��1�A��0]S	!�V:͚���]��H�C,	`�|�2>a/N����q�c)���8�01�REL3��HX��Ʊ`a�C$$F*�C�R�q�}�p����P�2��A6�m�o]�m!�-D	����,�s��i�v2o	�&XFL�Y�,���%`��,���a����<5�o�Cj)atH2E��dS�������6�&"�D�l�ɺ8_*�6 ��u^��(8�P��{��`��v��vA�F]+�f��c�O�^���ÄI�D�i��W� /�����6˲��uh;��Q���,�����f]�l��z �C!c��QP�sz�gc�ou�ۋ���ccpl8�B�����MƑ#H�$mZ�X�A��N���H]��͊|t��>G����Y�!�����FY���Mh7�F�0�Ҹ�䊅�`��l��sp�6�M6	D�v�q��w-t���'����d	�;�KK:F��Ӓɿl���2����[��?�z����y�g���.�S�_�['�i'�rD��I�JX%��)�r�j�j-�!��V�]������[O^b<u_.?a&�;�7�5FHu��|
��j,��d��?�B�ehz�����W�;��a��w�g�uk�]N���N�*˒��H��L��we��q,Ms|1[h.�N�WY'\%�nㄘ6��H�"4c,MY./~�̥��4H�ܘL�`y����R�c��V<����ח������X������8�0�=��ko��ˍC��cW�PV�~��}�)`���)'�`@������<��~�F'l��L�[�#m�y��Q��!h�wT�u��v�R�B0û��(��*�=���gvH�
״����w�Wş��(���0���ݒ�U^�$��c�;��[�-�����6�݀�0��T�aMLux���hrA�S���_ON�)�]T�~к���k�ˎ��x��|���1�y��6LA�8e�#�2�{
���v%{���pG/ޱ	��V=���	ݭ{2B�gs ����Qrlw^+�7�s�N��S'��7��(~�n�8 �=�Z�
��q}��԰p��,D8�;aY�5�|}�����d� 0�Z�Ԁ�_WN��I���x�u�v���;d������m��o�pt�x���X ��n"��� ����L��ډ�
�M[0z�0@�$@龍'c�v���C��U�<8K$�Sv��@Q�ba�)%�T���6F�o�;H���Wfp�ݖ;M��}�ɫ�/џ�D"�;���I�L�c�FT�<R1eQ��Y��Ti�.�@�������Y&�Pnw�R~��8�1C)ǩ"�rCn��δl#�mD��(�6�fO��9��4a����J9��<�E�#��4�I�DF��K��(��R�n6Yn.P� ���UYH���pN��x�$q.	������7{뚍l��m6��l��>Uo��w���v�&����X����)I�( t ef�oC�2�iz�y�M ,o�.+�6& G2_���7Wcl�]j� r�,��:��!�U�|8�s�b%�E�8�3I�s��8C����/5�!
U�mA:�Gܺ(�E%Zʈ��PK�Ѵ�/2�Gr��v<�܄���	����df�� �bà�$���LN|��mD�>�F�@Q�h���7ϙN��8�W�i}@��O��W� �o?e߼]4�c���W�8�1f��=��*�sJE0�����������iGe������Ũ3�s��ߦ�Gt�p^|Y[b���0���8���"��&�D8�EDQf�\�Ri&r
������Ы HS8c�P0���~/�͈���x���Ыk"�MD���6%�&�|��|�t�����qFx�ij6Л��-#R�Q�������l�^��g��y�g�Η�:Kt���X��,߾�_К�⳷�G�D��];�I����k��y�~��,��<�8�s�O?�<K���;�|�$8�#���0�`ש]���.nQ������i�m��>��V��b�K���n�#̭e3�\,<����<���)'� �\^��B��إ�~O܍c�=���.!q:̽�L����(D�=Wβz�<:� �6S����1�FϽ���$�N@Fj���Kt����s�)����z�#����b�Z����������s](o���	$�П��l�{���gM>_�3�:`̞9y��n/�:>5w�YK���ı
����JR�
�{oR����=��Ig#ȑ.����zD��^$ ���(I�EId���N���C�2�^�2�I�Q�a��l�q7z�n;���G@�=�hwٽ�#\C������M���M�v��ݝ���]�}�g}���w射x��MV]5�茬cN��Jj�m�����)��j�ѩVE�_ZA�|5�^���zXBl�se�q(�#�E�_Z9⒔S�l�M����'��Ӑ��i8�|i͜�m��"�wˮ��s�d��*��"�Һ9��u�	m�����v�i�"�VhG�Jk}i՜����"�{������8�:P�{����e%[ڒ�{�����n֥HyjB�%������9�ڕ]�C��誛��'+JR�f>a�.�a:��|���������)B�敍/�q^A�I�'o+9F°1g�s���'*47؏c"8ҍ�8?�$}����p�B@D����n1^���<$��V\n���g��ږYn�9�����9قGk^�Ғ-:�łs���,p�ͫVZr�g���9�} ����Z�ș��g%�A����n�"�&;���:������`LQ�����;u?�a`�]�����w���F�^<��(��-9�!�g]$&H!=�+��M���s��g����B=?�gk�.�{���oY7�)�k	Kz��z8*��7k*7��{�q�ۖ��w��X7�'�1���ZR��Fݓv�X����_'��o#��{rL����l��C��H��l�>yG�e�8y��u��bwqt�$�t���y��}Dp-�k�0PO�p�pbwn�ҿ�v��I���i�m@9 Yy7-%����5�����.w��<n��Z���{��������{$崽8f��>�uXy�S@=d�6�{����������S�[և�p��7V�z�ho?%�pr� v+9s��4�8���^�!�C�qv�L�M�kqN�|����d�����w�	|���7W�����������X�w��u    ����}z�΋�Ui n�>~��W>��������^�/�0�� B�:���0\����Cv#i�O�z�E}�q�n�V�ג�yŋ�v_������1���IL��j��E{��
�nfA�SN�/�ho7'aՍ�%M�#���S�H�Y�rz��vWVݘT5�:���t��ܧz��C���k�ݮcp��>s'��r8��];� �S]�����mʼt�N �U1�=Ղ���Vw���VF;��l���d��KJ
���#��ÑS�H��H���>�-���:$��E���eUݞ|m��
��LE�a��r�����,�X�������=�8f0ۅ|�e�z�حEs�^���=u�"`=dt�c���0�{�Q�����i{q�R`���X�/6܉c��]L��+�,�g�{V_�s��S�(ރYw��^R�S� s�=Z�Ğ�K' D=g�Q�j`mGȯ��A��ͳ�MH�}�q�ڔ��7]��z�r���hvO��C������^���{��4��
k;��'�Oߓ��^��c"ۣ$":��$?^�O'	 �=�{Q<{OCUO����:� R�9���V�,�d�w�d�G�����{�q��3�; G��Q<� ~:5;KX�W��{��ˑ�r|�$�^�'�X�_��f9k��ߙ�t&&)o0}�>�  LZ�J�t~�������������I}8%�>/�N>�Ɯ�:f?�c@U�ǳ�#&�YN;]��Ў�L ��n������	s��m���h�L@�&^zͻc8൞c�5�޷��O/Sz�Om����\�)���ſ�
�+g���E{������a��x��0��@d4x��u���$��}�v'����P���1B�eȁ�_���;�? E֓vD��)б�6B��%/�,x�>�$ R���FH���1���u@�<�:���`�#�?��{�+�+ ����4�LY8��4{�s2F ��4�����9JxqN� ��P��s�	����X�AҜl!<���TI{�� ~>Pq
�oŴ��c*N	�,��Z2>�jig6���_�Z��Z�=��ig;r��Y��z��o#����F��>��8���^"iS�q��Z]�@8[��5�%�d��E��Xӈ�LA�'OlJ������ɶ�����I+��Z��R�Mu��?rc��t� a,��Eփ�h�M���#�b��a�Lˍ�	�7�թ�;�}��2s�vK�H�D���{aM��jH�k�}I��l�W[����,��`F�����vo[�sqv���/Y[��8�.�� �������b}s�y���t���7z�A��(�ؐ� I%"1av]�0W��[?���zs�P��cn�8�N�A Z	��E#�p%DC�o��ް��E�#W>z̠{���.F>RN����y���!_b�gk�K��$ц���޾�ؙ��*�S<h������*{V1�#�����;���{s�C�"{����~��1�q�0������ ��I`�5O!�
q�� 
��~��4��d:�Y�#�0���i���$�d(��&��'lNdug�X� ��6��ɒ�1�z,ܐ�����P<����Ea�޴���\����W�PzC�u��ߠ�$"㯰7��D X,�N���k����k�d[�K_�� �����J^�� ȕ��m��I^�� Ȕ����\�ǜѸ�}�K���|�[d�f�>�	dK��N6+F8� Mb�XY0"u�3-#�1��aw�՘w�	��vV���~2+q�{���?��z���	^���ml����pZ��Y��ɢ��~WIM�k�t�M��ݦ�"��\߮͵{��e�[�j�mgW	�Mƹ�X�∲DE�
�4
`�3Y�fVwR�i��M��n0�!�P�7'������BSoGJ�ǉ��7 �\o�֬�_ ����O 7���$�7�[v�=(�rQ���Pn����h��Z^w���ח�O��ww��m��'�ɽ.b�����G�\M�n{�ϊ)6�����b�mOn��*C�Y��|?�O=�;��8Է�7��1�&���'i=`���������n2�S��/������2��~��k����8�M��f��ئKvNS��:�L�q�.�S �y���m�YLKe�:o[7�~n%�� �be�|af��3'���fY��Z�^Ŀ�J֯����Ġ�1׶^�6���(��O��h�4UϞ�v�>ȸ����uN�$<�I8�ɻA��Hw�2'YPԷ@U�{���K-��$G`QԳ��x�<C/w?�<㕚q�AڦU���V%�Y<9���a1��E����"J����$3���M_ǌ���BF,\1.�c���rg%�g����TeZ�jzj����YqC�� �h�w���`DsM�p�����A�����J3�S�$�ؽy�6mI�B�
�J�Z%�^�#'yDs��"�+Nc�q�yB�Z���U���#ai�U��[��
ysU���1_�ۀ)�z2�d��RŵR;��7���?�8+��c1��&�0aR5~�������d����C=��l�,��uh;��@A8�es�Ͼ2߬�����������Uv���U�e���zq�����w �3�Bs�o)�$K�$J�1�s���H�T�f	�)4��6����mN"�0� 7g��(��H�Y)�J��V:-α�k���*�q
Hʩ�$K��icU$,O�cm$�D`��%�F�"�� ���,�B�֪�P���V��V�r�y3��9���ܬj�#�߫z�rn
���ԙ	�e[+�Vߝ����P��er��a�ï�BӋz�]��C�����}���,M�õI�fG��\|1�V�N'S�Ϻ7�/��z-G���9YP����E}M(`D��E'���H%	�(g�����`����1MkP%'����iDS�i�"��5��6r!`��<bD[��ÈK�����K�f���X����z�J`�+	$E��H�F�F�ϟ��d�o?e߼]<e��<ϩ���aG4I�cp��$��y����� �c�#���40�RFņ���� ˬfy����<��?�>��}���g�{x��2���� ��1���+?��	�p�R�ؕ�OoZ�+�R�\���R{B���N�;M�4���N�8�2�F1Ĩ�Ũ�1�9�R+e*�Dj0�g��i����&�#��K�#�;��ny��t�2��W�t�G:/�t�5��� Z»n�u��Ɨ��y���wx��y����bC�au�-Q)�a�2Ӌ�,R��"L4�@hz[���\���~�^̄E�x�r�E#|�i����\"<�� "<�� �b@��a��"�r�H��"dXzG`��&��@h��������8Q�� @v�o10���y���k�w�S����yJ@��Qu��L)��(��I�MrUW��Γf?��k����s���}���/4���l��wy��y��]�wy��}-.ϕ�JiU�#�%p�x���_n|�b|��G�$!id�2֩ȔD8��dTHEZ��u\���տ\��4�R���ET��<Fz#EΉ���k�r�V9.�B���w �LG�d˂�� �na:{#T��ş�k�ᧇ�?�y9A?�����O��SVG�cj "�!��҅�
"�(I�%1e��鴧��f�����{���v~���{i�ןf�i�g�f<+��7�ސ{C���r��`yQ�m��S�DL!��M�)����d(�����[oo��>��M�7}��y��5�>��-�(m��c���k/��^�x�b~o�a�@�'�e�څ�e�ߕE�Scꭽ�g:����I���/�U.���p16޾_����|�*� ��ŗ���n	RĻR�����P�<�M�b�Q�4�D���8�!��pͰ�s9�"���5�"�@�@Q���J�L)tZP�ҹ�&޽��a��Iڴ����@��f ��o�/�m�����16�����`��!��ڋvp�#�4��R�G��� ��0�$0�&�T�!�    �,�qh���?PF����a����k��OҦ�c`�w�u:R�'i�b�õ����a~o���!&�����Ʌ;���l��ɻ��`���jle!�\�wf�X��{{�3���|��d�n�W��~�J!���=�0�o���,��'+�F�&���:
{&���Mx�=�����[eJ0H;��,�I���6���Q��f�U?j��=j�[``MUǚ�]�'� ���i�h�kwau:R['i�bu�:���:9@NҦc���f��Tm�~;Y����]��Y�����]m��)��\�4/[Z�-V��h�W 2���H05o��Ԙ����wk�>͗ ���z�y=IWז������ҳu����C��R��y��:�=�&;��Q9ϑ�͏?bF����n�H�Z<uwp�6��,�h��#�NGj�$mV�@ ʺ�:�ӑ�$mV�`D��v.8� �`yC�5F��%o�2]C�ف��,T�n���� �UV��j
b��j:����u�k�y&pʉS!
%,��RBJ���A�r�0���L4���{v��u��b�z�jb�j>+\��<�NB�9�.��f�4�:�@�L	tEgZ�)�)o�zl�b����䣖�M7^����U��M>�j9���m�Z��_p���9��2V����Y������O�?��1Nݏʾ�+�o^e^����Zy�M�
�&J�yu��+��q�Aq�;O,��d�(tp>5T8��1��l�y��1��l�y��1��l.C����3z��H�"� �D�H�ܼ�9|/&�O�Q�Gm�y��Q�Gm�y��*Q�G9�x��Q�G9�x��Q�+E9vV���q�2U=�+��ȇZb
$�k���rq7���b�$��Ą���C!��C�T�Z�/uU�+�.���q�HuS2��H��Hk�FZ�*�(c*�1�I�����H��_[������(G]90�������mI�N�zڔ�W�=���I�g���^�O�n��!$���!��<� %�0�SiN a"#C�fҺ�/$�/س���K��"x���������[׊"��0��T���s�j�.Dr�6���4`"n�2�!� �jn[��Z��Xܞ<������D
����'�6I /d��^/7`�$�����i���l�����=2��9�v���y����Z4�flE ���Zu$1��!-c��Y��&n��h�Qk�~u�7-�0�fm�����Jg�{�_�6�SA<9[m� �B�:#�k��3�F	�L�0��$�=�+��ٻ�6\4��?��~0Vj�tc%�Q��o����=�G� RI� �Ր m���e;Z�l2�j���f:}s�P`z7�����k�|.4�(Y�o�t����M/����U���w�� �1_��ی��m:�����,���X=�~�����L��Ѡ*��^��o���b
��Τ��/���j��T�~t��C�����vv4h۞�z�r��
�5ʅ$�T
�sq����	�d�s���<P&0�h<�E��[�����c�r̳�c�_���1�Z�!~9�/Ǽ���/���P�C9�<��P�C9�<��P�ܠ�;&��v�i�ؠ��Op�}�4�U�c�.i��<��X�c9��<��X�ub9�r<��(ǣ�r<��(ǣ�W�r��Jp����MIamo�UGR�$��ʌ}+��^f�뀂�k����X`y���{�u y���_���1��t�yL�1��t�yL�1݅a:wl���6���0p7�H�O�d�L�'M��<dL�P��<��X�c9��<��X�ub9�r<��(ǣ�r<��(ǣ�W�r���"	��U]�_@��󧰔.�<�qO�@��+�F�E�&���6�S>��bp�n��G‣>�X�3�_�.[�����j�]_�@K�n��^��7Ώ 'C2�!H�X�])������d�A�|@��i�O�4<L�H���W�s�ιN%���DlY>�Ո-�����":i�Num��kSO�Y6�������tM�[�7��G�����l��-���]����p��Z��){�)�ϯn��r��?f�n��T�;NR���2 2, .h@ 	S������۱� +2�K��<|���<�y`���9��]svi�)����ֻ[�n����ֻ�ۻH!.�ޜę�3�,�L��Hq$i̅�c*�����z��]�w���~q�띑wF�yg䝑wF_��5�"�bR�z'���}6�Oa%]�Wk�����)$T�e0v���9Ŕ�$B0m��k�\u #�Xбy{���e�U�6�a��mφm��6�|���Ur�m�����{[�m��������T��"9e��I�#���mD�d,���:6�0��u	�r���.׻\�r������;#3���;�/��
cR� Fw����X%=
+�J/m�] ��O!a�29E,`�Q�L����j��ؒ$��t��u�K��X���h�#��4$���a�"a{�.�=�o��?ۉe)L��+�h�4� j[���	,� r�r&gˆ�@q�R.�+e�q ���bD\�m�'�Yq����o�F��ƶ���&���?�q}g�W7��ƌ*q�[��2�w�Q�����#���b<�=��Y�v�h��j� �cM�Ë��N$��J� 1J��Q� ' 0Re�I���x�(�x����?G�U��~�������V��y��ћGo�y�{^ ��E~��0e�a���D���'3Ġ��La��⭢���*����^x{�텷��Eu&0�.!&�J�RD��)�Q�1�s��*7�����5�A��d����s?��X~-c��'����m�)�<�Y�P�G4�&����1̩=c���W2����M[\WP��� i���i$
� ЍB&ҩ����^S8�?m���v�����U���!�2+q����"��%y%)ɣ\ �*2��}�,�t�+�-��w����Q�ml�2�������{ �i�ȑ�@^X ꑜGr�y$瑜Gr�y$�ܥ"9��U�\RH��c��X�8J���G�0�
�.��<��X�c9��<��X�c�W��<��(ǣ�r<��(ǣ�r^)�)�T�n��)�rX�d��n(�Ky+��]9^?eڋ���� �v��O�[���j��F~�KU#f[�'�������v�-[�g>��k����I��Y�k%�O�l}}�O��������l�6u�Y6����)��~��o�E��'�`�WŬ��X?W���0h����8�m�O�Es|�n�>�<;�����m;�H����`Y�.�0C��7�T����qL�c�ñ�(A� �wl���������/ӛ���z{��ٝ?����x%�w{`bkkk�k'�+����<�6��rnw�\!�!����c�91�BGJ2�f��mK����r��	m�hTJM*���
0��'�4��q�\(���))��K}~W��n�Kj��Sȥ���5,mlF��X��j�+���Z&�Z�_�C�J�yW=t6��>���㔠x*����`֚Og:�	bQb�'���8��&ĠI�wF�� r;E%�[L�`�h�t���j��r�Z��V�h7D��T����V�`�<Z2櫻3��F��#�9;;S��Vm�����I�G�=���G�6��/i�v���),�K1x܃u)z�X�Rg���[}�E�`kL�P���
u��oW�T�dx�dHE; �7��~y4e�h���;v�XaT��	7�ڼN�F47(R���� ӂ�4f|����}mS��ޤ2s>�����j�_�zNY����M�7�ޔzS�M鱶�sx��j>&x�������~�~z��-��,޲���T+�
��h��×�nK�S��Y�}���Ӻ�����t��V)��^��Q���q[��A��j�Ƭޖ����Q�������x�׾����s��+� ���e��#hml�`�t�`�(�c��`ȏO�4��o^�6�"�_�ݎ&
s7���,�?�n� �  ��#�e��x�Y�(����%��g�#�	 "Dcd(�L�C\��-!�	`����1���'�sԆ;�;��n;��B����F[k�p�Y��WDo���ɵ��oWoFȽ��F���l�f��K[��Auv�g�ֳ��672g��P"�#i�RPB�<��Ɖ�JČ�|��Π�zm;�.�y��2��fJA,�Xs�Ԭ�\�4E��a�#�"%(��BT!�k�7(R�?̧�e��:	��r�i�f���l�o��L��C�I���B�cR����В�9�W����[{fb:�ٶ��Զ;���;��mV��~���kߦ���1K3�5ۿ^G֟��"��v�h��/��"�Q�W͞�?xVƃ�t����
Ĉַ�ٰ1C��Y�*����,�t�v���Y�DABj�j-&S�8��yD1��M�(�"�X�Da5�=�Yp�[V��J�v��Ee^������X �Z@�C7�?���Z1��[ �Q�f��Y�<�ي	�T)!���9��k[ʌE��R��,�);  p	�}��7>�s�{fҐ+�ӧ��=B�<��uu9�r��Ì,����̻,.TY��kQ5
Pc3O�/ v�V�U ^�0��u�^G<l��$�MZdGr���,��}���)�}��<b�x�)ק��Z��ƴ�^Lf���j]�`��;C1��6��Z<�H�SD���>�[�Gl�/rI���������P���U{�����QK��B��įШ-	��l�y�yme"�H�5��4	a��&�/���}+��S����k��뀷%E�*-�jd��j}�yS��/h���,�'�^�UP؇�|:I��u�K��X�҈j�#��4$�� x�#aMo��p����`�g;BmU>�^��Pv��P�(��6a~��9ق�l@�����,%[V���}3���t�d�0%���ͧ�L���_��Ѩ�����i���I,�쩭D�jR���i�5�O�S��r�^W�@�qB����ya*����˞�?Di�I�xʁ�h���Oݏ��=��I]��#���O�;�{P%�`8�T��^*ƴ�F]��Pz�~��0v���'�)`�;�~H�D륱8���6���e]�6��\nL�[1��Y���sE�G���Á�p�;�?8�w&_��'}p��ǩ NY���T�|aMk�o�i��g��E�s�� ۞���s�ĎA�cON��zb?~���Q뤯@�=!=�Czq�9�2L����\�Ơ٣�:�/]X1�7�_��G�,��N�$�H�:*��Y醨NҸ������54�-�r�e_W�o|��kV�����'�WȚ�+����e�k��#�x��y�>g��_<��98?rx��C����M�q=��$�}EvGƁ��9L��#*xN�Z��!!}Y����$�paGw�C߈yf�>#Ry����"s�7���1�K�J9h�rv���V|Hk���1���p���c�W�ў&�5P<>��Sn_��\ܤ�����S����d�X��d'HH��O��T4�8E7d�8�U5�i ��ô���� �/��N8)//o����UĜ�/�����KT�-��C��g���s��Kt��1)��s����3S5)���9�!^�}�EM�&��9�d����/���~�s�Tz�˃��;k�x�d{*��H�ȅ�qH�8 e��G'���K|�͟���l�S��wKc,�Yl���O�i�
��̂�+]h+N�Tϊ�[u7O���C�0�℘�G�<҄�Q"	�KS��r����X�$e�tX���,I��@qDY���e��q,Ms|0+c�XW=A,�n㻷�}28ž���
�_���d�d��04����>�W�n/y��9�Y6�ɐ���8�ݜ��tR7����ٹss�|�J'qpɼg���C��Z�ۗ0ٷ���?Eێ3pуqy���d�/����xs�n���!+\���5(�ԷY�׻��6��O�ݰ��N'Ly���e���^������HrrT Ǟ$4��&��Ϝ^
�ؙ�����������.��X��&�x��A����N��y���l+$�Iy��r{��dO6�n��MD����n�=J�N&����b�m�ʝ���o�t����:\es=�B��f���P����~o}�ڟWSx���'�[8իY~�_��e�U���5��7o�����1��pUEX���,�fmG�?z�3+������M[����_����9�Ց�0(z�ȶd�dK���+~M7F��1�!^�_�ҝ Ϯh�PI��_]O!u�U�Oo�#�<M�,�l��"��$R�0̄u���on��U�d#��My_Gl�b|�jk��[k�v
��,��y9f�3�)�J�p�&4�d$E��_NL��,5,Ii�z�B�vȷ���X]Ӂb%���W��?�}*7���$��8/}�f&W��f��I�[[�UrY�Z+W���Jd�܋��b*�Oa%^�j�� ���J �WL�_)t�
u���*����U����3KGf[�m��;CJ�� u\���\�S{-��|p�o5���d=�!�u��@��uzw������<y��u����;!\��|6Yϗ����Yl�,~�w�|�/?�7� =�����k۽YF0h!��nVp,�w���[R�Eb�07o�A��o�*�_�ZT��	�f�U{M�N����޹so��澘��wf��/�9]��s������Gj�n�FS)�z�µ|(F��m���u&S��I����rt��!��8O��Ra3��[&0����=�ɣ��0!bQՋDLH�x��C�s%Ff�N ��L.�J�A1�5iS�)�{�Uz��� �2�H�m��%�m#3w�9i�i�֫8��X� �ϟ�J���.Y-��M;59�2�Zg*͌�8���(J#%��TLp�"�b��.Y}p�t[�*
��KV��}�Ӱrp�+B�V�j2TH������乭V� �DU�j�8�9ǑHpQ$�WL#�Gy��Ffl� ����5>�]{����������Y�!QYXz̔�Y�M�V)�J�țE�����/Dܨq��%����3�1c4�������E��d��eO�Ykd�,.0�!@�EL���O��x�V� �F�%LBFi�����V� �C�&5:�F���/�P&Q���ƙ��m�����Y����Y��WY�1P#-�<O��@�NQ����r�9�༉�6�9�ܨ��X�r;��rV��DZ�6qĻ<7@̳���ϯ��@��=^az�Y6'�xbD�nbC�[���i5�z�%qFbE��$����B��A�ΒXs-�������-���q+�C� ��O�	l�Պ�N���Թ��9��Y�
���T)��%�����8�)29�B�l{+�((���Υ�Gϸ���0:�y]� F�Й�ɠ1�1�}\�֮���H��|$] ��x!޾����'^A�o8ʌ^v�/�f5	��,ԋ�\r;���l��������< �      �   ]   x��K
�  е���a��v]����HC��Go��"���d#�6ɋ��"0��J����n*�G��6�b���4���	�s�gP-,<̜��N      �   C  x�͐�n�@ ���{Դ����	k�V�� 1!�bAi�j|�j�4�4s���$J�i����Z����Ao*� ��?rSϫ��1�.��y�'~��'s:&I�p&��kZR����\I�1��'[
��i�h�llڄ����M^��qu)�RL��_��t ��k�W��8s��nWfa���`��	��`6=���f��-�U<���33���� �T�徸W����M������̫CcȘ�M'�����wk/�Q��q������A���,�N?F�v�����0�gVA.տ�*�C�7���B]x�BWU����      �      x������ � �      �      x������ � �      �   ?   x�K32OLKL1�56�4�5I1I�M2KI�M25ON���r���s&唦r:	�=... �]�      �      x�m�Ak�0��s�+v�MS�$_���7٦/_�L���)�׏�Nc�_xh�5ST2�T�-j
�3B	���l�k�qq�<�#V&E�x�П�2T$��j�m|�SW�����eXN7�"�ޞ�7���m�0�]��L�g�Y7Y���r�{qG��f��u��<?O��F��²�WG��9�R(�Q	��(����fF+��?;g(4ei:�ِ�Di�1 �2ԭ��Ah�k.ĺO�:��N���IE�LXH      �      x������ � �      �      x������ � �      �   g   x���1 �X�¹ p�8A_�?�w��N�X��$�/6�s��lGad�@��x�ֆ�ߨe�w��h�ehǐ�|	dl�{A��i�ȅ�~Z��K��      �   �  x�e�ˎ�(��>O�~|;jE��e��2���M��1m,���<}
��$ݑ,��W�W[Ԭn(����;���U�_�)>O>��Yw!�M^��F��׷�p���w��K �I��c���8����ͮ�J�_q�8E6p����$o5�=�1P���"r�F�����<ǀ�	�E�Uǉ��*o^]ow�ES�J ���4cz�i���+����J�P�~8�/S1���푊7~��-��,��e���dʟ����Ȥ�-�{�^�q�)m��)K3ۺG�\AKԄǒ�ϙ}�i"��1�>X9����w#k�7H*MGE�
b�H?@���~��^r�gޖu���/�Y����Gc���h�#�O�ӝ�y�h�K���� �]lB�^�t8�:�q���c�-���N�M1(.y�@u�I,�6t`���aJ!h���V�aCjv�ę�r`]&�����Qa��"����^���nvHT���`�#��H�.��<�'��2?��8D���,S{Y~ݼ�r��3!+�-�+*z��в�v��3-�MZg��4��gg^�]�A����r�K 9�@�B�ӳJ��g��4]�G�&�� 	�
�.�����ޞ��:����k�sX����Ӂ��Ѣ��$I�4l�ӝ�1F��c�1*X7R`h�G�M��B���<�N? .Px�      �   �  x���˵ !�m.�#?�$&����Cz&�ޗro>��M�"d(��b�/�3�7�G[�À����E��y����_2͂���AVN�[�d/;���%��e���I����d�9��KN%�Rc�0�"O���Dd_�O/9r�Y w����q@]����f/H7�&���U{���*��|���IF0�u�n�sc����n�%���I��W�n��}��N����g<�g���#�,r��Pr���oӑ��̔U�Jk���o��=G$������eCh�����{l�\-�#��<�%�"?�G��L���ɓ F�� ]g���mh����,R�OTİ�/���dV�=S��IJ�U䧫��Ԛ���_ �
�+�Y:�d9�{k�F��S��4��[����IO�Nݮ����Z��a�      �   �   x��ϻn�@��z�����쮧)Ez�4C����R<=����F:��}:���u���h��30�j��]x���a��;>v��a��q��z������/'_����h�vޟ���J�)���T��QMZ�U^@Չ��Ĵ� ��S�*����O1���L0���R��y�+`�����i���n      �   D  x�]бn�0��Y~
.�%�D�	�n	�e�,:1���}�8�k�e$m�6�D�O���z9�@���T&��P�FI�f�<QϷ�E6xN��_W�+��u����d�q��.�������g�_�2Y�]6����IE�A�������,�.o�uU�4���>����vi;�k����6�;�?�ܹ/����=����J���I;�=�3�x*�!F�l����t�ki��pN�m���+$�$���|į�<JG�yk��@�������Ƥ)%��%�9x<�.dL�Y�
�XW��6Û�k��w]�wO��      �   e   x���
�0D��32�Tqw�ԡ�P�Ԗ����˽;�n0k�$��(�Ë+)^bN� D�2W�Lx�c�є��v)�1k��5�a'��v��ƹ�b����     