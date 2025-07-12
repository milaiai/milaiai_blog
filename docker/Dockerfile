FROM slamai/hugo
MAINTAINER yubao.liu.ra@tut.jp 

ENV DEBIAN_FRONTEND noninteractive

# RUN apt update
 


COPY docker/entrypoint.sh /root/entrypoint.sh
RUN sudo chmod a+x /root/entrypoint.sh
ENTRYPOINT ["/root/entrypoint.sh"]

CMD ["bash"]
