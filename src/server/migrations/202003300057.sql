create table player (
	id serial constraint pk_player primary key,
	nickname varchar(32),
	suffix serial,
	constraint uq_player_nickname_suffix unique ( nickname, suffix )
)
