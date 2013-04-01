CWD=$(shell pwd)
JSDOC?=/usr/nodejs/lib/node_modules/jsdoc-toolkit
OUTPUTDIR=${CWD}/build
DOCDIR=${OUTPUTDIR}/doc
PKGDIR=${OUTPUTDIR}

all: prepare doc package

clean:
	rm -rf ${OUTPUTDIR}

prepare:
	mkdir -p ${OUTPUTDIR}

doc:
	cd ${JSDOC} && \
	app/run.js -a -p -v -r=10 -t=templates/jsdoc -d=${DOCDIR} ${CWD} && \
	cd -

package:
	tar jcf ${PKGDIR}/nami.tar.bz2 AUTHORS LICENSE GNUmakefile package.json README src

